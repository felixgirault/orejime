import type {Purpose as CorePurpose} from '../core';
import CookieOptions from '../core/CookieOptions';

export type JsonParser = (json: string) => any;
export type JsonSerializer = (json: any) => string;
export type CssNamespace = (className: string) => string;
export type Translate = (path: string[]) => string;

export interface Purpose extends CorePurpose {
	title: string;
	description?: string;
	optOut?: boolean; // TODO vocab
}

export interface PurposeGroup {
	id: string;
	title: string;
	description?: string;
	purposes?: Purpose[];
}

export type PurposeList = Array<PurposeGroup | Purpose>;

export interface BannerTranslations {
	title: string;
	description: string;
	privacyPolicy: string;
	privacyPolicyTitle: string;
	accept: string;
	acceptTitle: string;
	decline: string;
	declineTitle: string;
	configure: string;
	configureTitle: string;
	dirtyNotice: string;
}

export interface ModalTranslations {
	title: string;
	close: string;
	closeTitle: string;
	globalPreferences: string;
	acceptAll: string;
	declineAll: string;
	save: string;
	saveTitle: string;
	poweredBy: string;
	newWindowTitle: string;
}

export interface PurposeTranslations {
	mandatory: string;
	mandatoryTitle: string;
	showMore: string;
	accept: string;
	decline: string;
}

export interface Translations {
	banner: BannerTranslations;
	modal: ModalTranslations;
	purpose: PurposeTranslations;
}

export type ElementReference = string | HTMLElement;

export interface Config {
	appElement?: ElementReference;
	orejimeElement?: ElementReference;
	debug: boolean; // TODO handle this (remove ??)
	defaultConsent: boolean; // TODO handle this (remove ??)
	lang: string;
	// TODO handle this
	logo:
		| boolean
		| string
		| {
				alt: string;
				src: string;
		  };
	forceConsent: boolean;
	forceNotice: boolean;
	noBanner?: boolean; // TODO handle this (remove ??)
	privacyPolicyUrl: string;
	stylePrefix: string; // TODO handle this
	cookie?: CookieOptions;
	purposes: PurposeList;
	translations: Translations;
}

export interface Consents {
	[appName: string]: boolean;
}

export type ConsentsWatcher = {
	update: (emitter: any, name: string, consents: Consents) => void;
};
