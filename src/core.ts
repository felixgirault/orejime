import {acquireManager} from './managerPool';
import {Config} from './types';
import {validate} from './utils/config';
import {language} from './utils/i18n';

export const defaultConfig: Config = {
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
	apps: [],
	debug: false
};

export function init(conf: Config) {
	const config = Object.assign({}, defaultConfig, conf);
	const errors = validate(config);

	if (errors.length) {
		console.error(errors.join('\n'));
		return;
	}

	const manager = acquireManager(config);

	if (!manager.requiresConsent()) {
		return;
	}

	return {
		//show: appRef.current.openModal,
		internals: {
			config,
			manager,
			//react: app
		}
	};
}

export default {
	init,
	defaultConfig
};
