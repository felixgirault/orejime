import { CookieConfig } from './types';
import { deleteCookie, getCookie } from './utils/cookies';

export default class Cookie {
	constructor(private config: CookieConfig) {
	}

	read() {
		getCookie(this.config.cookieName);
	}

	write() {

	}

	delete() {
		deleteCookie(this.config.cookieName);
	}
}