import React, {
	forwardRef,
	ForwardRefRenderFunction,
	Ref,
	useContext,
	useImperativeHandle,
	useState
} from 'react';
import ConsentModal from './ConsentModal';
import ConsentNoticeWrapper from './ConsentNoticeWrapper';
import {InstanceContext} from './InstanceContext';

interface Handle {
	openModal: () => void;
}

interface Props {
	ref: Ref<any>;
}

const Main: ForwardRefRenderFunction<Handle, Props> = (_, ref) => {
	const {ns, config, manager} = useContext(InstanceContext);

	const shouldShowModal = () =>
		config.mustConsent && manager.requiresConsent();

	const isNoticeVisible = () =>
		config.mustConsent || config.noNotice ? false : manager.requiresConsent();

	const [isModalOpen, setModalOpen] = useState(shouldShowModal());

	// used to trigger a rerender so the component gets the
	// current value of manager.requiresConsent()
	//
	// /!\ FIND A WAY TO OBSERVE THE VALUE INSTEAD
	//
	const [, rerender] = useState<object>();

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(shouldShowModal());
		rerender({});
	};

	const save = () => {
		manager.saveAndApplyConsents();
		closeModal();
	};

	const declineAll = () => {
		manager.declineAll();
		manager.saveAndApplyConsents();
		closeModal();
	};

	const acceptAll = () => {
		manager.acceptAll();
		manager.saveAndApplyConsents();
		closeModal();
	};

	// makes openModal() available from the outside
	useImperativeHandle(ref, () => ({
		openModal
	}));

	return (
		<div className={ns('Main')}>
			<ConsentNoticeWrapper
				key="notice"
				isOpen={isNoticeVisible()}
				isModalOpen={isModalOpen}
				onSaveRequest={acceptAll}
				onDeclineRequest={declineAll}
				onConfigRequest={openModal}
			/>

			<ConsentModal
				key="modal"
				isOpen={isModalOpen}
				onHideRequest={closeModal}
				onSaveRequest={save}
			/>
		</div>
	);
};

export default forwardRef(Main);
