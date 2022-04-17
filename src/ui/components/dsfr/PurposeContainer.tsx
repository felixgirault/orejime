import React from 'react';
import {PurposeTranslations, Purpose as PurposeType} from '../../types';
import {useConsent} from '../../utils/hooks';
import Purpose, {ConsentState} from './Purpose';

export interface PurposeContainerProps {
	t: PurposeTranslations;
	purpose: PurposeType;
}

const PurposeContainer = ({t, purpose, ...props}: PurposeContainerProps) => {
	const [consent, setConsent] = useConsent(purpose.id);

	return (
		<Purpose
			{...props}
			t={t}
			name={purpose.id}
			label={purpose.title}
			description={purpose.description}
			isDeclinable={!purpose.isMandatory}
			consent={consent ? ConsentState.accepted : ConsentState.declined}
			onChange={setConsent}
		/>
	);
};

export default PurposeContainer;
