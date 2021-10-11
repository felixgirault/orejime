import assign from 'assign-deep';
import {App, Config, Consents} from '../types';
import translations from '../translations';

export const validate = (config: Config) => {
	const errors = [];

	if (!Object.keys(config.apps).length) {
		errors.push('  - you must define `apps` to manage');
	}

	if (!config.privacyPolicy.length) {
		errors.push('  - you must define a `privacyPolicy` url');
	}

	if (errors.length) {
		errors.unshift('Orejime config error(s):');
	}

	return errors;
};

export const getElement = (config: Config) => {
	const {elementID: id, stylePrefix} = config;
	let element = document.getElementById(id);

	if (element === null) {
		element = document.createElement('div');
		element.id = id;
		document.body.insertBefore(element, document.body.firstChild);
	}

	let child = document.querySelector(`.${stylePrefix}-AppContainer`);

	if (child === null) {
		child = document.createElement('div');
		child.className = `${stylePrefix}-AppContainer`;
		element.appendChild(child);
	}

	return document.querySelector(`.${stylePrefix}-AppContainer`);
};

export const getTranslations = (config: Config) =>
	assign({}, translations, config.translations);

export const getLogoUrl = (config: Config) =>
	typeof config.logo == 'object' ? config.logo.src : (config.logo as string);

export const getLogoAlternative = (config: Config) =>
	typeof config.logo == 'object' && config.logo.alt ? config.logo.alt : '';

export function getApp(config: Config, appName: string) {
	return config.apps.find((app) => app.name === appName);
}

export function getPurposes(config: Config) {
	const purposes = new Set<string>([]);

	for (let i = 0; i < config.apps.length; i++) {
		const appPurposes = config.apps[i].purposes || [];

		for (let j = 0; j < appPurposes.length; j++) {
			purposes.add(appPurposes[j]);
		}
	}

	return Array.from(purposes);
}

export const areAllAppsRequired = (config: Config) => {
	const isAnyAppOptional = config.apps.some(({required}) => !required);
	return !isAnyAppOptional;
};

export const areAllAppsEnabled = (config: Config, consents: Consents) => {
	const isAnyAppDisabled = config.apps.some(({name}) => !consents[name]);
	return !isAnyAppDisabled;
};

export const areAllAppsDisabled = (config: Config, consents: Consents) => {
	const isAnyAppEnabled = config.apps.some(
		({name, required}) => required || consents[name]
	);

	return !isAnyAppEnabled;
};
