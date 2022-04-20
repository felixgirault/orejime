import React from 'react';
import type {PurposeTranslations, Purpose as PurposeType} from '../types';
import {useConsent} from '../utils/hooks';
import {ConsentState} from './types/ConsentState';
import type {PurposeComponent} from './types/Purpose';

export interface PurposeContainerProps {
	translations: PurposeTranslations;
	purpose: PurposeType;
	Purpose: PurposeComponent;
}

const PurposeContainer = ({
	translations,
	purpose,
	Purpose,
	...props
}: PurposeContainerProps) => {
	const [consent, setConsent] = useConsent(purpose.id);

	return (
		<Purpose
			{...props}
			translations={translations}
			name={purpose.id}
			label={purpose.title}
			description={purpose.description}
			isMandatory={purpose.isMandatory}
			isOptOut={purpose.optOut}
			consent={consent ? ConsentState.accepted : ConsentState.declined}
			onChange={setConsent}
		/>
	);
};

export default PurposeContainer;
