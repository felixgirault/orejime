import {setup} from '../core';
import type {Config} from '../ui';
import umd from '../umd';

umd(async (config: Config) => {
	const manager = setup(config);
	const preload = () => {
		import('../ui');
	};

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
			show,
			preload
		};
	}

	return {
		...(await loadUi()),
		manager,
		preload
	};
});
