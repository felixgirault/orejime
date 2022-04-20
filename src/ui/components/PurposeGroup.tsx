import React from 'react';
import type {PurposeTranslations, Purpose as PurposeType} from '../types';
import {useGroupActions, useGroupStates} from '../utils/hooks';
import PurposeContainer from './PurposeContainer';
import {ConsentState} from './types/ConsentState';
import type {PurposeComponent} from './types/Purpose';

export interface PurposeGroupProps {
	translations: PurposeTranslations;
	id: string;
	title: string;
	description: string;
	purposes: PurposeType[];
	Purpose: PurposeComponent;
}

const PurposeGroup = ({
	translations,
	id,
	title,
	description,
	purposes,
	Purpose
}: PurposeGroupProps) => {
	const [areAllEnabled, areAllDisabled] = useGroupStates(purposes);
	const [acceptAll, declineAll] = useGroupActions(purposes);

	return (
		<Purpose
			translations={translations}
			name={id}
			label={title}
			description={description}
			consent={
				areAllEnabled
					? ConsentState.accepted
					: areAllDisabled
					? ConsentState.declined
					: ConsentState.unknown
			}
			onChange={(consent) => (consent ? acceptAll() : declineAll())}
		>
			{purposes.map((purpose) => (
				<PurposeContainer
					translations={translations}
					purpose={purpose as PurposeType}
					Purpose={Purpose}
				/>
			))}
		</Purpose>
	);
};

export default PurposeGroup;
