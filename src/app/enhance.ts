import {Manager} from '../core';

declare global {
	interface DocumentEventMap {
		orejimeAcceptAll: Event,
		orejimeDeclineAll: Event
	}
}

export default (manager: Manager) => {
	document.addEventListener('orejime.show', () => {
	});

	document.addEventListener('orejime.acceptAll', () => {
		manager.acceptAll();
	});

	document.addEventListener('orejime.declineAll', () => {
		manager.declineAll();
	});

	document.addEventListener('orejime.clear', () => {
	});
};
