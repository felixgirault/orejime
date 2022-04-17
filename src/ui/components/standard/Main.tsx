import React, {useContext} from 'react';
import withMain from '../containers/withMain';
import {InstanceContext} from '../InstanceContext';
import Banner from './Banner';
import Modal from './Modal';
import DeferredManagerProvider from '../DeferredManagerProvider';
import PurposeList from './PurposeList';
import {useIsDirty} from '../../utils/hooks';

const Main = ({
	t,
	isBannerOpen,
	isModalOpen,
	openModal,
	closeModal,
	// TODO move out ?
	onAcceptAll,
	onDeclineAll
}) => {
	const {config} = useContext(InstanceContext);
	const isDirty = useIsDirty();

	return (
		<>
			{isBannerOpen ? (
				<ConsentNoticeWrapper
					t={t.banner}
					isDirty={isDirty}
					isModalOpen={isModalOpen}
					privacyPolicyUrl={config.privacyPolicyUrl}
					onAccept={onAcceptAll}
					onDecline={onDeclineAll}
					onConfigure={openModal}
				/>
			) : null}

			{isModalOpen ? (
				<DeferredManagerProvider>
					{(commit) => (
						<ConsentModal
							t={t.modal}
							isDirty={isDirty}
							isOpen={isModalOpen}
							onSave={commit}
							onClose={closeModal}
						>
							<PurposeList t={t} />
						</ConsentModal>
					)}
				</DeferredManagerProvider>
			) : null}
		</>
	);
};

export default withMain(Main);



import type {ForwardRefRenderFunction, Ref} from 'react';
import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useState
} from 'react';
import {useIsDirty} from '../utils/hooks';
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

	const shouldShowModal = () => config.forceConsent && isDirty;

	const isNoticeVisible = () =>
		config.forceConsent || config.noNotice ? false : isDirty;

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
