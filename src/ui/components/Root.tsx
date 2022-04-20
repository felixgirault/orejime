import type {ForwardRefRenderFunction} from 'react';
import {forwardRef, useContext, useImperativeHandle} from 'react';
import type {Translations} from '../types';
import {useBannerState, useIsDirty, useModalState} from '../utils/hooks';
import DeferredManagerProvider from './DeferredManagerProvider';
import {InstanceContext} from './InstanceContext';
import PurposeList from './PurposeList';
import type {BannerComponent} from './types/Banner';
import type {ModalComponent} from './types/Modal';
import type {ModalBannerComponent} from './types/ModalBanner';
import type {PurposeComponent} from './types/Purpose';

interface RootHandle {
	openModal: () => void;
}

interface RootProps {
	translations: Translations;
	Banner: BannerComponent;
	ModalBanner: ModalBannerComponent;
	Modal: ModalComponent;
	Purpose: PurposeComponent;
}

const Root: ForwardRefRenderFunction<RootHandle, RootProps> = (
	{translations, Banner, ModalBanner, Modal, Purpose},
	ref
) => {
	const {config, manager} = useContext(InstanceContext);
	const isDirty = useIsDirty();
	const isBannerOpen = useBannerState();
	const [isModalOpen, openModal, closeModal] = useModalState();
	const BannerComponent = config.preventNavigation ? ModalBanner : Banner;

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

	return (
		<>
			{isBannerOpen ? (
				<BannerComponent
					translations={translations.banner}
					commonTranslations={translations.common}
					isDirty={isDirty}
					isHidden={isModalOpen}
					privacyPolicyUrl={config.privacyPolicyUrl}
					onAccept={handleAcceptAll}
					onDecline={handleDeclineAll}
					onConfigure={openModal}
				/>
			) : null}

			{isModalOpen ? (
				<DeferredManagerProvider onCommit={closeModal}>
					{(commit) => (
						<Modal
							translations={translations.modal}
							commonTranslations={translations.common}
							isForced={config.forceConsent && isDirty}
							privacyPolicyUrl={config.privacyPolicyUrl}
							onSave={commit}
							onClose={closeModal}
						>
							<PurposeList
								translations={translations}
								Purpose={Purpose}
							/>
						</Modal>
					)}
				</DeferredManagerProvider>
			) : null}
		</>
	);
};

export default forwardRef(Root);
