import React from 'react';
import type {Aria} from 'react-modal';
import Dialog from '../Dialog';
import type {ModalBannerComponent} from '../types/ModalBanner';
import Banner from './Banner';

const ModalBanner: ModalBannerComponent = ({t, ...props}) => (
	<Dialog
		htmlOpenClassName="fr-no-scroll"
		portalClassName="orejime-banner-portal"
		overlayClassName="orejime-banner-overlay"
		className="fr-modal fr-modal--opened"
		aria={
			{
				label: t.title
			} as Aria
		}
	>
		<Banner t={t} {...props} />
	</Dialog>
);

export default ModalBanner;
