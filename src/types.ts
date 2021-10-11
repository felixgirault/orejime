export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;
export type CssNamespace = (className: string) => string;
export type Translate = (path: string[]) => string;

type AppCookieProps = [
	pattern: RegExp,
	path: string,
	domain: string
];

export type AppCookie = string | RegExp | AppCookieProps;

export interface App {
	callback?: (consent: boolean, app: App) => void;
	cookies: AppCookie[];
	default?: boolean;
	description: string;
	name: string;
	onlyOnce?: boolean;
	optOut?: boolean;
	purposes?: string[];
	required?: boolean;
	title: string;
}

export interface Category {
	apps: string[];
	description: string;
	name: string;
	title: string;
}

export interface CookieConfig {
	cookieDomain?: string;
	cookieExpiresAfterDays: number;
	cookieName: string;
	parseCookie: JsonParser;
	stringifyCookie: JsonSerializer;
}

export interface Config extends CookieConfig {
	appElement?: HTMLElement;
	apps: App[];
	categories?: Category[];
	debug: boolean;
	default: boolean;
	elementID: string;
	lang: string;
	logo:
		| boolean
		| string
		| {
				alt: string;
				src: string;
		  };
	mustConsent: boolean;
	mustNotice: boolean;
	noNotice?: boolean;
	optOut?: boolean;
	poweredBy?: string;
	privacyPolicy: string;
	stylePrefix: string;
	translations: {};
}

export interface Consents {
	[appName: string]: boolean;
}

export interface ConsentsWatcher {
	update: (emitter: any, name: string, consents: Consents) => void;
}

export type Translations = {
	[key: string]: string | Translations;
};
