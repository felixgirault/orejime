import {Manager} from './core';
import type {Config} from './ui';

declare global {
	interface Window {
		orejimeConfig: Config;
		orejime: any;
	}
}

export interface UmdGlobal {
	config: Config;
	manager: Manager;
	show: () => void;
	preload: () => void;
}

export default (setupOrejime: (config: Config) => Promise<UmdGlobal>) => {
	const setup = async () => {
		if (
			window.orejimeConfig !== undefined &&
			// `window.orejime instanceof Element` means there is a #orejime div in the dom
			(window.orejime === undefined || window.orejime instanceof Element)
		) {
			window.orejime = await setupOrejime(window.orejimeConfig);
			document.dispatchEvent(
				new CustomEvent('orejime.initialized', {
					bubbles: true,
					detail: window.orejime
				})
			);
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setup);
	} else {
		setup();
	}
};
