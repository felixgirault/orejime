import assign from 'assign-deep';
import type {Manager, Config as CoreConfig} from '../core';
import {Config, validateConfig, language, setup} from '../ui';

const defaultConfig: Config = {
	elementID: 'orejime',
	stylePrefix: 'orejime',
	privacyPolicy: '',
	default: true,
	mustConsent: false,
	mustNotice: false,
	logo: false,
	lang: language(),
	translations: {},
	trackers: [],
	debug: false
};

export default (cfg: CoreConfig, manager: Manager) => {
	const config = assign({}, defaultConfig, cfg);
	const errors = validateConfig(config);

	if (errors.length) {
		console.error(errors.join('\n'));
		return;
	}

	return setup(config, manager);
};
