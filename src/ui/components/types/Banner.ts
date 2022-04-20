import type {FC} from 'react';
import type {
	BannerTranslations,
	CommonTranslations,
	ImageDescriptor
} from '../../types';

export interface BannerProps {
	translations: BannerTranslations;
	commonTranslations: CommonTranslations;
	isDirty: boolean;
	isHidden: boolean;
	privacyPolicyUrl: string;
	logo?: ImageDescriptor;
	onAccept: () => void;
	onDecline: () => void;
	onConfigure: () => void;
}

export type BannerComponent = FC<BannerProps>;
