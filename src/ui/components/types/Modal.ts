import type {FC} from 'react';
import type {CommonTranslations, ModalTranslations} from '../../types';

export interface ModalProps {
	translations: ModalTranslations;
	commonTranslations: CommonTranslations;
	isForced: boolean;
	privacyPolicyUrl: string;
	onSave: () => void;
	onClose?: () => void;
	children: any;
}

export type ModalComponent = FC<ModalProps>;
