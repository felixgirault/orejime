import ConsentsMap from './ConsentsMap';

type CookieOptions = {
	name: string;
	domain?: string;
	duration: number;
	parse: (consents: string) => ConsentsMap;
	stringify: (consents: ConsentsMap) => string;
};

export default CookieOptions;
