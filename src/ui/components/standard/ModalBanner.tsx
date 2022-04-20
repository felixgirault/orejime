import React from 'react';
import type {Aria} from 'react-modal';
import Dialog from '../Dialog';
import {ModalBannerComponent} from '../types/ModalBanner';
import Banner from './Banner';

const ModalBanner: ModalBannerComponent = ({t, ...props}) => (
	<Dialog
		htmlOpenClassName="orejimeHtml-WithBannerOpen"
		bodyOpenClassName="orejimeBody-WithBannerOpen"
		portalClassName="orejime-BannerPortal"
		overlayClassName="orejime-BannerOverlay"
		className="orejime-BannerWrapper"
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
