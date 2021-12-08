import {setup} from '../core';
import type {Config} from '../ui';

//
//
// code split by hand ?
//
//

export default async (config: Config) => {
	const manager = setup(config);
	const loadUi = async () => {
		const setupUi = (await import('../ui')).setup;
		return setupUi(config, manager);
	};

	const show = async () => {
		(await loadUi()).show();
	};

	manager.on('dirty', (isDirty) => {
		if (isDirty) {
			show();
		}
	});

	if (!manager.isDirty()) {
		return {
			config,
			manager,
			show
		};
	}

	return {
		...(await loadUi()),
		manager
	};
};
