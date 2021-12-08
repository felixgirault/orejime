import {Config} from '../types';

export const validateConfig = (config: Config) => {
	const errors = [];

	if (!Object.keys(config.trackers).length) {
		errors.push('Orejime: no `trackers` to manage');
	}

	if (!config.privacyPolicy.length) {
		errors.push('Orejime: missing `privacyPolicy` url');
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

export const getLogoUrl = (config: Config) =>
	typeof config.logo == 'object' ? config.logo.src : (config.logo as string);

export const getLogoAlternative = (config: Config) =>
	typeof config.logo == 'object' && config.logo.alt ? config.logo.alt : '';
