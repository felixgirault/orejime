import React, {useContext} from 'react';
import {InstanceContext} from './InstanceContext';

interface Props {
	children: (commit: () => void) => JSX.Element;
}

export default function DeferredManagerProvider({children}: Props) {
	const {t, ns, config, manager} = useContext(InstanceContext);

	// Child components manipulate this clone as it was the
	// real thing, but we're using it as a temporary store.
	// Its data is copied into the real one when the user
	// explicitly saves his choices.
	const tempManager = manager.clone();

	const commit = () => {
		manager.setConsents(tempManager.getAllConsents());
	};

	return (
		<InstanceContext.Provider value={{t, ns, config, manager: tempManager}}>
			{children(commit)}
		</InstanceContext.Provider>
	);
}
