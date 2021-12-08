
export type TrackerCookieProps = [
	pattern: RegExp,
	path: string,
	domain: string
];

export type TrackerCookie = string | RegExp | TrackerCookieProps;

export default interface Tracker {
	id: string;
	cookies: TrackerCookie[];
	default?: true;
	isMandatory?: boolean;
	isOneShot?: boolean;
}
