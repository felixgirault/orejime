import type {ForwardRefRenderFunction, Ref, FunctionComponent} from 'react';
import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useState
} from 'react';
import {useIsDirty} from '../../../react';
import {InstanceContext} from '../InstanceContext';

export interface MainProps {
	isBannerOpen: boolean;
	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	onAcceptAll: () => void;
	onDeclineAll: () => void;
	onUpdateConsents: ({}) => void
}

export type MainComponent = FunctionComponent<MainProps>

export default (Component: MainComponent) => {
	interface Handle {
		openModal: () => void;
	}

	interface Props {
		ref: Ref<any>;
	}

	const MainContainer: ForwardRefRenderFunction<Handle, Props> = (_, ref) => {
		const {config, manager} = useContext(InstanceContext);
		const isDirty = useIsDirty(manager);

		const shouldShowModal = () => config.mustConsent && isDirty;

		const isBannerOpen =
			config.mustConsent || config.noNotice ? false : isDirty;

		const [isModalOpen, setModalOpen] = useState(shouldShowModal());

		const openModal = () => {
			setModalOpen(true);
		};

		const closeModal = () => {
			setModalOpen(shouldShowModal());
		};

		const acceptAll = () => {
			manager.acceptAll();
			closeModal();
		};

		const declineAll = () => {
			manager.declineAll();
			closeModal();
		};

		// makes openModal() available from the outside
		useImperativeHandle(ref, () => ({
			openModal
		}));

		return (
			<Component
				isBannerOpen={isBannerOpen}
				isModalOpen={isModalOpen}
				openModal={openModal}
				closeModal={closeModal}
				onAcceptAll={acceptAll}
				onDeclineAll={declineAll}
				onUpdateConsents={() => {}}
			/>
		);
	};

	return forwardRef(MainContainer);
};
