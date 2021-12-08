import {Manager} from '../core';

declare global {
	interface DocumentEventMap {
		orejimeAcceptAll: Event,
		orejimeDeclineAll: Event
	}
}

export default (manager: Manager) => {
	document.addEventListener('orejimeAcceptAll', () => {
		manager.acceptAll();
	});

	document.addEventListener('orejimeDeclineAll', () => {
		manager.declineAll();
	});
};
