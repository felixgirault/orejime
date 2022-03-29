
export type PurposeCookieProps = [
	pattern: RegExp,
	path: string,
	domain: string
];

export type PurposeCookie = string | RegExp | PurposeCookieProps;

export default interface Purpose {
	id: string;
	childIds: string[];
	cookies: PurposeCookie[];
	default?: true;
	isMandatory?: boolean;
	isSingleton?: boolean;
}
