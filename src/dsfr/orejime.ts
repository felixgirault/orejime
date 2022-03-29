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

interface DsfrConfig extends Config {
	consentBannerSelector: string
}

umd(async (config: DsfrConfig) => {
	const fullConfig = {
		consentBannerSelector: '.fr-consent-banner',
		consentModalSelector: '#fr-consent-modal',
		consentModalSubmitSelector: '.fr-consent-manager__buttons .fr-btn',
		...config
	}

	const manager = setup(config);
	const notice = document.querySelector(fullConfig.consentBannerSelector);
	const modal = document.querySelector(fullConfig.consentModalSelector);
	const submitButton = document.querySelector(fullConfig.consentModalSubmitSelector);

	const show = () => {
		notice;
	}

	const setupNotice = () => {

	}

	submitButton.addEventListener('click', () => {
		const services = document.querySelectorAll('.fr-consent-service');
	});

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
