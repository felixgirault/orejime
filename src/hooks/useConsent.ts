import {useState} from 'react';
import Manager from '../core/Manager';

export default (
	manager: Manager,
	id: string
): [boolean, (state: boolean) => void] => {
	const [consent, setConsent] = useState(manager.getConsent(id));

	manager.on('update', (diff) => {
		if (id in diff && diff[id] !== consent) {
			setConsent(diff[id]);
		}
	});

	return [consent, (state) => manager.setConsent(id, state)];
};
