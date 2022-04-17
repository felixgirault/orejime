import React from 'react';
import type {PurposeTranslations, Purpose as PurposeType} from '../../types';
import {useGroupActions, useGroupStates} from '../../utils/hooks';
import Purpose, {ConsentState} from './Purpose';
import PurposeContainer from './PurposeContainer';

export interface PurposeGroupProps {
	t: PurposeTranslations;
	id: string;
	title: string;
	description: string;
	purposes: PurposeType[];
}

const PurposeGroup = ({
	t,
	id,
	title,
	description,
	purposes
}: PurposeGroupProps) => {
	const [areAllEnabled, areAllDisabled] = useGroupStates(purposes);
	const [acceptAll, declineAll] = useGroupActions(purposes);

	return (
		<Purpose
			t={t}
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
				<PurposeContainer t={t} purpose={purpose as PurposeType} />
			))}
		</Purpose>
	);
};

export default PurposeGroup;
