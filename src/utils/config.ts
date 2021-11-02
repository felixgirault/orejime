import assign from 'assign-deep';
import translations from '../translations';
import {Config} from '../types';

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
