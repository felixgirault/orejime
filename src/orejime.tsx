import React from 'react';
import {render} from 'react-dom';
import assign from 'assign-deep';
import ConsentManager from './consent-manager';
import translations from './translations';
import Main from './components/Main';
import {t, language} from './utils/i18n';
import {createCssNamespace} from './utils/css';
import {Config} from './types';

function getElement(config: Config) {
	const {elementID: id, stylePrefix} = config;
	var element = document.getElementById(id);
	if (element === null) {
		element = document.createElement('div');
		element.id = id;
		document.body.insertBefore(element, document.body.firstChild);
	}
	var child = document.querySelector(`.${stylePrefix}-AppContainer`);
	if (child === null) {
		child = document.createElement('div');
		child.className = `${stylePrefix}-AppContainer`;
		element.appendChild(child);
	}
	return document.querySelector(`.${stylePrefix}-AppContainer`);
}

function getTranslations(config: Config) {
	console.log(
		translations,
		config.translations,
		assign({}, translations, config.translations)
	);
	return assign({}, translations, config.translations);
}

const managers: {[name: string]: ConsentManager} = {};
function getManager(config: Config) {
	const name = config.elementID;
	if (managers[name] === undefined)
		managers[name] = new ConsentManager(config);
	return managers[name];
}

export const defaultConfig = {
	elementID: 'orejime',
	stylePrefix: 'orejime',
	cookieName: 'orejime',
	cookieExpiresAfterDays: 365,
	stringifyCookie: JSON.stringify.bind(JSON),
	parseCookie: JSON.parse.bind(JSON),
	privacyPolicy: '',
	default: true,
	mustConsent: false,
	mustNotice: false,
	logo: false,
	lang: language(),
	translations: {},
	apps: {},
	debug: false
};

export function init(conf: Config) {
	const config = Object.assign({}, defaultConfig, conf);
	const errors = [];
	if (!Object.keys(config.apps).length) {
		errors.push('  - you must define `apps` to manage');
	}
	if (!config.privacyPolicy.length) {
		errors.push('  - you must define a `privacyPolicy` url');
	}
	if (errors.length) {
		errors.unshift('Orejime config error:');
		console.error(errors.join('\n'));
		return;
	}
	const element = getElement(config);
	const trans = getTranslations(config);
	const manager = getManager(config);
	const app = (render(
		<Main
			t={t.bind(null, trans, config.lang, config.debug)}
			ns={createCssNamespace(config.stylePrefix)}
			manager={manager}
			config={config}
		/>,
		element
	) as unknown) as Main;
	return {
		show: app.showModal.bind(app),
		internals: {
			react: app,
			manager: manager,
			config: config
		}
	};
}

export default {
	init,
	defaultConfig
};