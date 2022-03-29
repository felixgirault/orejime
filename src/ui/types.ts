import type {Config as CoreConfig, Purpose as CorePurpose} from '../core';

export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;
export type CssNamespace = (className: string) => string;
export type Translate = (path: string[]) => string;

export interface Purpose extends CorePurpose {
	title: string;
	description: string;
	purposes?: string[];
	// TODO rename optout
	optOut?: boolean;
}

export interface Config extends CoreConfig {
	appElement?: HTMLElement;
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
	purposes: Purpose[]
}

export interface Consents {
	[appName: string]: boolean;
}

export type ConsentsWatcher = {
	update: (emitter: any, name: string, consents: Consents) => void;
};

export type Translations = {
	[key: string]: string | Translations;
};
