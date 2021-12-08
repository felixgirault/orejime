import {Manager} from '../core';
import assign from 'assign-deep';
import React, {createRef} from 'react';
import type {ElementRef} from 'react';
import {render} from 'react-dom';
import {InstanceContext} from './components/InstanceContext';
import Main from './components/Main';
import {Config} from './types';
import {validateConfig, getElement} from './utils/config';
import {createCssNamespace} from './utils/css';
import {language, t} from './utils/i18n';

export const defaultConfig: Config = {
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

export default (cfg: Config, manager: Manager) => {
	const config = assign({} as Config, defaultConfig, cfg);
	const errors = validateConfig(config);

	// TODO throw instead
	if (errors.length) {
		console.error(errors.join('\n'));
		return;
	}

	const element = getElement(config);
	const appRef = createRef<ElementRef<typeof Main>>();
	const app = render(
		<InstanceContext.Provider
			value={{
				config,
				manager,
				t: t.bind(null, config.translations, config.lang, config.debug),

				// TODO
				// instead create a namespaced classMap
				ns: createCssNamespace(config.stylePrefix)
			}}
		>
			<Main ref={appRef} />
		</InstanceContext.Provider>,
		element
	);

	return {
		show: appRef.current!.openModal,
		react: app,
		config
	};
};
