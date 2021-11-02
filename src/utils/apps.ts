import {App, AppCookie, Consents} from '../types';
import {deleteCookie, getCookieNames} from './cookies';
import {escapeRegex, uniq} from './lang';

// temporary fix to avoid touching the code for now
declare global {
	interface HTMLElement {
		[attr: string]: any;
	}
}

export const pickApps = (apps: App[], names: string[]) =>
	names.map((name) => apps.find((app) => app.name === name));

export const getDefaultConsent = (app: App, defaultConsent: boolean) => {
	return app.default ?? defaultConsent;
};

export const getDefaultConsents = (apps: App[], defaultConsent: boolean) =>
	apps.reduce(
		(consents, app) => ({
			...consents,
			[app.name]: getDefaultConsent(app, defaultConsent)
		}),
		{} as Consents
	);

export const getApp = (apps: App[], appName: string) =>
	apps.find((app) => app.name === appName);

export const getPurposes = (apps: App[]) =>
	uniq(apps.reduce((all, {purposes}) => all.concat(purposes || []), []));

export const areAllAppsRequired = (apps: App[]) => {
	const isAnyAppOptional = apps.some(({required}) => !required);
	return !isAnyAppOptional;
};

export const areAllAppsEnabled = (apps: App[], consents: Consents) => {
	const isAnyAppDisabled = apps.some(({name}) => !consents[name]);
	return !isAnyAppDisabled;
};

export const areAllAppsDisabled = (apps: App[], consents: Consents) => {
	const isAnyAppEnabled = apps.some(
		({name, required}) => required || consents[name]
	);

	return !isAnyAppEnabled;
};

const updateScriptElement = (element: HTMLScriptElement, consent: boolean) => {
	if (!consent) {
		element.type = 'opt-in';
		element.src = null;
		return;
	}

	if (element.dataset.src === undefined) {
		return;
	}

	// we create a new script instead of updating the node in
	// place, as the script won't start correctly otherwise
	const clone = element.cloneNode(true) as typeof element;
	clone.src = element.dataset.src;

	const parent = element.parentElement;
	parent.removeChild(element);
	parent.insertBefore(clone, element);
};

const updateDomElement = (element: HTMLElement, consent: boolean) => {
	const {dataset} = element;
	const attrs = ['href', 'src'];

	if (consent) {
		for (const attr of attrs) {
			const attrValue = dataset[attr];

			if (attrValue === undefined) {
				continue;
			}

			if (dataset['original' + attr] === undefined) {
				dataset['original' + attr] = element[attr];
			}

			element[attr] = attrValue;
		}

		if (dataset.title !== undefined) element.title = dataset.title;
		if (dataset.originalDisplay !== undefined)
			element.style.display = dataset.originalDisplay;
	} else {
		if (dataset.title !== undefined) element.removeAttribute('title');
		if (dataset.hide === 'true') {
			if (dataset.originalDisplay === undefined)
				dataset.originalDisplay = element.style.display;
			element.style.display = 'none';
		}
		for (const attr of attrs) {
			const attrValue = dataset[attr];
			if (attrValue === undefined) continue;
			if (dataset['original' + attr] !== undefined)
				element[attr] = dataset['original' + attr];
		}
	}
};

const updateAppElement = (element: HTMLElement, consent: boolean) => {
	switch (element.tagName) {
		case 'SCRIPT':
			//case 'LINK':
			return updateScriptElement(element as HTMLScriptElement, consent);

		default:
			return updateDomElement(element, consent);
	}
};

export function updateAppElements(name: string, consent: boolean) {
	document
		.querySelectorAll<HTMLElement>(`[data-name="${name}"]`)
		.forEach((element) => {
			updateAppElement(element, consent);
		});
}

export function updateAppCookies(appCookies: AppCookie[]) {
	const cookies = getCookieNames();

	appCookies.forEach((pattern) => {
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
}
