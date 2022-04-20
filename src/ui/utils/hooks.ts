import {useContext, useEffect, useRef, useState} from 'react';
import type {Purpose} from '../../core';
import ConsentsMap from '../../core/ConsentsMap';
import {
	acceptedConsents,
	areAllPurposesDisabled,
	areAllPurposesEnabled,
	declinedConsents
} from '../../core/utils/purposes';
import {InstanceContext} from '../components/InstanceContext';

// @see https://stackoverflow.com/a/56818036/2391359
export const useBeforeRender = (callback: () => void) => {
	const willMount = useRef(true);

	if (willMount.current) {
		callback();
	}

	willMount.current = false;
};

export const useIsDirty = () => {
	const {manager} = useContext(InstanceContext);
	const [isDirty, setDirty] = useState(manager.isDirty());
	manager.on('dirty', setDirty);
	return isDirty;
};

export const useBannerState = () => {
	const {config} = useContext(InstanceContext);
	const isDirty = useIsDirty();

	if (!isDirty) {
		return false;
	}

	return config.forceConsent ? false : isDirty;
};

export const useModalState = (): [
	isOpen: boolean,
	open: () => void,
	close: () => void
] => {
	const {config, manager} = useContext(InstanceContext);

	// We're ready `isDirty` from the manager instead of using
	// the `useIsDirty` hook, because we need the state to be
	// in sync when trying to close the modal below.
	// Using the hook leads to kind of a race condition
	// because we have to wait for a rerender to get the actual
	// value, but the manager could be updated during this
	// short window.
	const mustOpen = () => config.forceConsent && manager.isDirty();

	const [isOpen, setOpen] = useState(mustOpen());
	const open = () => {
		setOpen(true);
	};

	const close = () => {
		setOpen(mustOpen());
	};

	return [isOpen, open, close];
};

export const useGroupStates = (purposes: Purpose[]) => {
	const {manager} = useContext(InstanceContext);
	const [states, setStates] = useState([
		areAllPurposesEnabled(purposes, manager.getAllConsents()),
		areAllPurposesDisabled(purposes, manager.getAllConsents())
	]);

	const update = (_: ConsentsMap, consents: ConsentsMap) => {
		setStates([
			areAllPurposesEnabled(purposes, consents),
			areAllPurposesDisabled(purposes, consents)
		]);
	};

	useEffect(() => {
		manager.on('update', update);

		return () => {
			manager.off('update', update);
		};
	});

	return states;
};

export const useGroupActions = (
	purposes: Purpose[]
): [() => void, () => void] => {
	const {manager} = useContext(InstanceContext);

	const acceptAll = () => {
		manager.setConsents(acceptedConsents(purposes));
	};

	const declineAll = () => {
		manager.setConsents(declinedConsents(purposes));
	};

	return [acceptAll, declineAll];
};

export const useConsent = (
	id: Purpose['id']
): [consent: boolean, setConsent: (consent: boolean) => void] => {
	const {manager} = useContext(InstanceContext);
	const [consent, setConsent] = useState(manager.getConsent(id));
	const setManagerConsent = (state: boolean) => {
		manager.setConsent(id, state);
	};

	const update = (diff: ConsentsMap) => {
		if (id in diff && diff[id] !== consent) {
			setConsent(diff[id]);
		}
	};

	useEffect(() => {
		manager.on('update', update);

		return () => {
			manager.off('update', update);
		};
	});

	return [consent, setManagerConsent];
};
