import {TrackerCookie} from '../Tracker';
import {deleteCookie, getCookieNames} from './cookies';
import escapeRegex from './escapeRegex';

export default (trackerCookies: TrackerCookie[]) => {
	const cookies = getCookieNames();

	trackerCookies.forEach((pattern) => {
		let path: string;
		let domain: string;

		if (pattern instanceof Array) {
			[pattern, path, domain] = pattern;
		}

		if (!(pattern instanceof RegExp)) {
			pattern = new RegExp(`^${escapeRegex(pattern)}$`);
		}

		cookies
			.filter((name) => (pattern as RegExp).test(name))
			.forEach((cookie) => {
				deleteCookie(cookie, path, domain);
			});
	});
};
