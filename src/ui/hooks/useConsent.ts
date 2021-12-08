import {useState} from 'react';
import {Manager, Tracker} from '../../core';

export default (
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
