import {setup} from '../core';
import type {Config} from '../ui';

// move to chunk
const loadTemplate = async (template: string | (() => string) | (() => Promise<string>)) => {
	if (typeof template === 'string') {
		return template;
	}

	const body = template();

	if (typeof body === 'string') {
		return body;
	}

	if ('then' in template) {
		return await template;
	}

	throw new Error();
};

export default async (config: Config) => {
	const manager = setup(config);

	const show = () => {

	}

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
};
