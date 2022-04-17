import React, {useContext} from 'react';
import {Translations} from '../../types';
import {useIsDirty} from '../../utils/hooks';
import DeferredManagerProvider from '../DeferredManagerProvider';
import {InstanceContext} from '../InstanceContext';
import type {MainComponentProps} from '../Root';
import Banner from './Banner';
import Modal from './Modal';
import PurposeList from './PurposeList';

interface MainProps extends MainComponentProps {
	t: Translations;
}

const Main = ({
	t,
	isBannerOpen,
	isModalOpen,
	openModal,
	closeModal,
	// TODO move out ?
	onAcceptAll,
	onDeclineAll
}: MainProps) => {
	const {config} = useContext(InstanceContext);
	const isDirty = useIsDirty();

	return (
		<>
			{isBannerOpen ? (
				<Banner
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
						<Modal
							t={t.modal}
							isDirty={isDirty}
							isOpen={isModalOpen}
							onSave={commit}
							onClose={closeModal}
						>
							<PurposeList t={t} />
						</Modal>
					)}
				</DeferredManagerProvider>
			) : null}
		</>
	);
};

export default Main;
