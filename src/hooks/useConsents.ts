import {useEffect, useState} from 'react';
import {Consents, ConsentsWatcher} from '../types';
import ConsentManager from '../ConsentManager';

export default (manager: ConsentManager) => {
	const [consents, setConsents] = useState<Consents>(manager.getConsents());

	useEffect(() => {
		const watcher: ConsentsWatcher = {
			update(_, name, data) {
				if (name === 'consents') {
					setConsents(data);
				}
			}
		};

		manager.watch(watcher);
		return () => manager.unwatch(watcher);
	});

	return consents;
};
