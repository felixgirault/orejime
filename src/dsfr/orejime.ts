import {setup} from '../core';
import type {Config} from '../ui';
import umd from '../umd';

// move to chunk
const loadTemplate = async (template: string | (() => HTMLElement) | (() => Promise<HTMLElement>)) => {
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

umd(async (config: Config) => {
	const manager = setup(config);

	const show = () => {
		const noticeTemplate = loadTemplate(config.dsfr.noticeTemplate);
	}

	const setupNotice = () => {

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
		};
	}

	return {
		manager,
	};
})
