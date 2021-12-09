import {useState} from 'react';
import {Manager, Tracker} from '../core';

export const useIsDirty = (manager: Manager) => {
	const [isDirty, setDirty] = useState(manager.isDirty());
	manager.on('dirty', setDirty);
	return isDirty;
};

export const useBatchStates = (manager: Manager) => {
	const [states, setStates] = useState([
		manager.areAllTrackersEnabled(),
		manager.areAllTrackersDisabled()
	]);

	manager.on('update', () => {
		setStates([
			manager.areAllTrackersEnabled(),
			manager.areAllTrackersDisabled()
		]);
	});

	return states;
};

export const useConsent = (
	manager: Manager,
	id: Tracker['id']
): [boolean, (consent: boolean) => void] => {
	const [consent, setConsent] = useState(manager.getConsent(id));
	const setManagerConsent = (state: boolean) => {
		manager.setConsent(id, state);
	};

	manager.on('update', (diff) => {
		if (id in diff && diff[id] !== consent) {
			setConsent(diff[id]);
		}
	});

	return [consent, setManagerConsent];
};
