import {deleteCookie} from '../utils/cookies';
import {getCookie, setCookie} from '../utils/cookies';
import ConsentsMap from './ConsentsMap';
import ConsentsRepository from './ConsentsRepository';

export default class CookieConsentsRepository implements ConsentsRepository {

	private options: {
		cookieName: string,
		cookieDomain: string,
		cookieDuration: number,
		parse: (consents: string) => ConsentsMap,
		stringify: (consents: ConsentsMap) => string,
	};

	constructor(options: Partial<CookieConsentsRepository['options']> = {}) {
		this.options = {
			cookieName: 'eu-consent',
			cookieDomain: undefined,
			cookieDuration: 120,
			parse: JSON.parse,
			stringify: JSON.stringify,
			...options
		}
	}

	read() {
		const {cookieName, parse} = this.options;
		const cookie = getCookie(cookieName);

		return cookie
			? parse(cookie)
			: {};
	}

	write(consents: ConsentsMap) {
		const {
			cookieName,
			cookieDomain,
			cookieDuration,
			stringify
		} = this.options;

		setCookie(
			cookieName,
			stringify(consents),
			cookieDuration,
			cookieDomain
		);
	}

	clear() {
		const {cookieName} = this.options;
		deleteCookie(cookieName);
	}
}
