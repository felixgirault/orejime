import React, {createRef} from 'react';
import type {ElementRef} from 'react';
import {render} from 'react-dom';
import {Manager} from '../core';
import {InstanceContext} from './components/InstanceContext';
import Root from './components/Root';
import Banner from './components/dsfr/Banner';
import Modal from './components/dsfr/Modal';
import ModalBanner from './components/dsfr/ModalBanner';
import Purpose from './components/dsfr/Purpose';
import type {Config} from './types';
import {DefaultConfig, validateConfig} from './utils/config';
import {getRootElement} from './utils/dom';
import {deepMerge} from './utils/objects';

export default (cfg: Config, manager: Manager) => {
	const config = deepMerge(DefaultConfig as Config, cfg);

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
			<Root
				ref={appRef}
				translations={config.translations}
				Banner={Banner}
				ModalBanner={ModalBanner}
				Modal={Modal}
				Purpose={Purpose}
			/>
		</InstanceContext.Provider>,
		element
	);

	return {
		show: appRef.current!.openModal,
		react: app,
		config
	};
};
