export type PurposeCookieProps = [
	pattern: RegExp,
	path: string,
	domain: string
];

export type PurposeCookie = string | RegExp | PurposeCookieProps;

export default interface Purpose {
	id: string;
	cookies: PurposeCookie[];
	default?: boolean;
	isMandatory?: boolean;
	isSingleton?: boolean;
}
