import type {Config} from './ui';

declare global {
	interface Window {
		orejimeConfig: Config;
		orejime: any;
	}
}

export default (setupOrejime) => {
	const setup = async () => {
		if (
			window.orejimeConfig !== undefined &&
			// `window.orejime instanceof Element` means there is a #orejime div in the dom
			(window.orejime === undefined || window.orejime instanceof Element)
		) {
			window.orejime = await setupOrejime(window.orejimeConfig);
			document.dispatchEvent(new CustomEvent('orejime.initialized', {
				bubbles: true,
				detail: window.orejime
			}));
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setup);
	} else {
		setup();
	}
}
