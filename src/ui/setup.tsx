import React, {createRef} from 'react';
import type {ElementRef} from 'react';
import {render} from 'react-dom';
import {Manager} from '../core';
import {InstanceContext} from './components/InstanceContext';
import Root from './components/Root';
import Main from './components/dsfr/Main';
import {Config} from './types';
import {validateConfig} from './utils/config';
import {getRootElement} from './utils/dom';
import {language} from './utils/i18n';
import {deepMerge} from './utils/objects';

export const defaultConfig: Partial<Config> = {
	orejimeElement: 'orejime',
	stylePrefix: 'orejime',
	defaultConsent: true,
	forceConsent: false,
	forceNotice: false,
	logo: false,
	lang: language(),
	purposes: [],
	debug: false
};

export default (cfg: Config, manager: Manager) => {
	const config = deepMerge(defaultConfig as Config, cfg);

	validateConfig(config);

	const element = getRootElement(config.orejimeElement);
	const appRef = createRef<ElementRef<typeof Root>>();
	const app = render(
		<InstanceContext.Provider
			value={{
				config,
				manager
			}}
		>
			<Root ref={appRef}>
				{(props) => <Main {...props} t={config.translations} />}
			</Root>
		</InstanceContext.Provider>,
		element
	);

	return {
		show: appRef.current!.openModal,
		react: app,
		config
	};
};
