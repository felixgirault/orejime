import ObservableMap from './ConsentMap';
import {CookieConfig} from './types';
import {deleteCookie, getCookie, setCookie} from './utils/cookies';
import {overwrite} from './utils/objects';

export default class ConsentRepository {
	public isDirty: boolean;

	constructor(
		private consents: ObservableMap<boolean>,
		private config: CookieConfig
	) {
		this.consents = consents;
		this.isDirty = false;

		this.consents.subscribe(() => {
			this.isDirty = true;
		});
	}

	load() {
		const cookie = getCookie(this.config.cookieName);

		if (!cookie) {
			return false;
		}

		const cookieConsents = this.config.parseCookie(cookie);
		const consents = overwrite(this.consents.defaults, cookieConsents);

		this.consents.setAll(consents);
		return true;
	}

	commit() {
		if (!this.isDirty) {
			return;
		}

		setCookie(
			this.config.cookieName,
			this.config.stringifyCookie(this.consents.values),
			this.config.cookieExpiresAfterDays || 120,
			this.config.cookieDomain
		);

		this.isDirty = false;
	}

	clear() {
		deleteCookie(this.config.cookieName);
	}
}
