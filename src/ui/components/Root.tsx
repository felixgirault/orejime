import type {ForwardRefRenderFunction} from 'react';
import {forwardRef, useContext, useImperativeHandle} from 'react';
import {useBannerState, useModalState} from '../utils/hooks';
import {InstanceContext} from './InstanceContext';

export interface MainComponentProps {
	isBannerOpen: boolean;
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	onAcceptAll: () => void;
	onDeclineAll: () => void;
}

interface RootHandle {
	openModal: () => void;
}

interface RootProps {
	children: (props: MainComponentProps) => JSX.Element;
}

const Root: ForwardRefRenderFunction<RootHandle, RootProps> = (
	{children: renderChild},
	ref
) => {
	const {manager} = useContext(InstanceContext);
	const isBannerOpen = useBannerState();
	const [isModalOpen, openModal, closeModal] = useModalState();

	const handleAcceptAll = () => {
		manager.acceptAll();
		closeModal();
	};

	const handleDeclineAll = () => {
		manager.declineAll();
		closeModal();
	};

	// makes openModal() available from the outside
	useImperativeHandle(ref, () => ({
		openModal
	}));

	return renderChild({
		isBannerOpen,
		isModalOpen,
		openModal,
		closeModal,
		onAcceptAll: handleAcceptAll,
		onDeclineAll: handleDeclineAll
	});
};

export default forwardRef(Root);
