import React, {createRef, ElementRef} from 'react';
import {render} from 'react-dom';
import {InstanceContext} from './components/InstanceContext';
import Main from './components/Main';
import {acquireManager} from './managerPool';
import {Config} from './types';
import {getElement, getTranslations, validate} from './utils/config';
import {createCssNamespace} from './utils/css';
import {language, t} from './utils/i18n';

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

	const element = getElement(config);
	const trans = getTranslations(config);
	const manager = acquireManager(config);
	const appRef = createRef<ElementRef<typeof Main>>();
	const app = render(
		<InstanceContext.Provider
			value={{
				config,
				manager,
				t: t.bind(null, trans, config.lang, config.debug),
				ns: createCssNamespace(config.stylePrefix)
			}}
		>
			<Main ref={appRef} />
		</InstanceContext.Provider>,
		element
	);

	return {
		show: appRef.current.openModal,
		internals: {
			config,
			manager,
			react: app
		}
	};
}

export default {
	init,
	defaultConfig
};
