export default interface Tracker {
	id: string;
	cookies: string[];
	default?: true;
	isMandatory?: boolean;
	isOneShot?: boolean;
}
