import type {FC} from 'react';
import type {PurposeTranslations} from '../../types';
import type {ConsentState} from './ConsentState';

export interface PurposeProps {
	translations: PurposeTranslations;
	name: string;
	label: string;
	description?: string;
	isHeader?: boolean;
	isMandatory?: boolean;
	isOptOut?: boolean;
	consent: ConsentState;
	children?: any;
	onChange: (consent: boolean) => void;
}

export type PurposeComponent = FC<PurposeProps>;
