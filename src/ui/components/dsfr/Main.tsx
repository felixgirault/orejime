import React from 'react';
import {ConsentManager, ConsentService} from '@dataesr/react-dsfr';
import withMain from '../containers/withMain';

const Main = ({
	isBannerOpen,
	isModalOpen,
	openModal,
	closeModal,
	onAcceptAll,
	onDeclineAll,
	onUpdateConsents
}) => {
	return (
		<ConsentManager
			bannerDescription="Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience utilisateur"
			bannerTitle="À propos des cookies sur dataesr/react-dsfr.fr"
			isModalOpen={isModalOpen}
			setIsModalOpen={(open) => (open ? closeModal() : openModal())}
			modalTitle="Panneau de gestion des cookies"
			modalCloseLabel="Fermer"
			modalCloseTitle="fermer la modal cookie"
			confirmButtonLabel="Confirmer mes choix"
			isBannerOpen={isBannerOpen}
			bannerButtons={{
				accept: {
					label: 'Tout Accepter'
				},
				refuse: {
					label: 'Tout Refuser'
				},
				customize: {
					label: 'Personnaliser'
				}
			}}
			confirmConsent={onUpdateConsents}
			refuseBannerButton={onDeclineAll}
			acceptBannerButton={onAcceptAll}
		>
			<ConsentService
				description=""
				title="Préférences pour tous les services."
				acceptLabel="Tout accepter"
				refuseLabel="Tout refuser"
				defaultConsent="refuse"
			/>

			<ConsentService
				description="Ce site utilise des cookies nécessaires à son bon fonctionnement qui ne peuvent pas être désactivés."
				title="Cookies obligatoires"
				acceptLabel="Accepter"
				refuseLabel="Refuser"
				defaultConsent="accept"
			/>
		</ConsentManager>
	);
};

export default withMain(Main);
