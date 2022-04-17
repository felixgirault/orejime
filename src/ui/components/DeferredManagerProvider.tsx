import React, {useContext, useRef} from 'react';
import {InstanceContext} from './InstanceContext';

interface DeferredManagerProviderProps {
	children: (commit: () => void) => JSX.Element;
}

export default function DeferredManagerProvider({
	children
}: DeferredManagerProviderProps) {
	const {manager, ...context} = useContext(InstanceContext);

	// Child components manipulate this clone as it was the
	// real thing, but we're using it as a temporary store.
	// Its data is copied into the real one when the user
	// explicitly saves his choices.
	const {current: deferred} = useRef(manager.clone());

	const commit = () => {
		manager.setConsents(deferred.getAllConsents());
	};

	return (
		<InstanceContext.Provider value={{...context, manager: deferred}}>
			{children(commit)}
		</InstanceContext.Provider>
	);
}
