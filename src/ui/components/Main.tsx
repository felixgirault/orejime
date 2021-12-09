import type {ForwardRefRenderFunction, Ref} from 'react';
import {
	forwardRef,
	useContext,
	useImperativeHandle,
	useState
} from 'react';
import {useIsDirty} from '../../react';
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
	const isDirty = useIsDirty(manager);

	const shouldShowModal = () => config.mustConsent && isDirty;

	const isNoticeVisible = () =>
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
		<div className={ns('Main')}>
			<ConsentNoticeWrapper
				key="notice"
				isOpen={isNoticeVisible()}
				isModalOpen={isModalOpen}
				onAcceptAll={acceptAll}
				onDeclineAll={declineAll}
				onConfigure={openModal}
			/>

			<ConsentModal key="modal" isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default forwardRef(Main);
