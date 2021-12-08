import setup from './orejime';
import type {Config} from '../ui';

declare global {
	interface Window {
		orejimeConfig: Config;
		orejime: any;
	}
}

const initDefaultInstance = async () => {
	if (
		window.orejimeConfig !== undefined &&
		// `window.orejime instanceof Element` means there is a #orejime div in the dom
		(window.orejime === undefined || window.orejime instanceof Element)
	) {
		window.orejime = await setup(window.orejimeConfig);
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initDefaultInstance);
} else {
	initDefaultInstance();
}
