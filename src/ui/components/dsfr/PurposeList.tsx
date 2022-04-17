import React, {useContext} from 'react';
import {Purpose as PurposeType, Translations} from '../../types';
import {InstanceContext} from '../InstanceContext';
import Purpose, {ConsentState} from './Purpose';
import PurposeContainer from './PurposeContainer';
import PurposeGroup from './PurposeGroup';

interface PurposeListProps {
	t: Translations;
}

const PurposeList = ({t}: PurposeListProps) => {
	const {config, manager} = useContext(InstanceContext);

	return (
		<>
			{config.purposes.length > 1 ? (
				<Purpose
					isHeader
					name="all"
					label={t.modal.globalPreferences}
					consent={
						manager.areAllPurposesEnabled()
							? ConsentState.accepted
							: manager.areAllPurposesDisabled()
							? ConsentState.declined
							: ConsentState.unknown
					}
					onChange={(consent) =>
						consent ? manager.acceptAll() : manager.declineAll()
					}
					t={{
						...t.purpose,
						accept: t.modal.acceptAll,
						decline: t.modal.declineAll
					}}
				/>
			) : null}

			{config.purposes.map((purpose) =>
				'purposes' in purpose ? (
					<PurposeGroup
						t={t.purpose}
						id={purpose.id}
						title={purpose.title}
						description={purpose.description}
						purposes={purpose.purposes}
					/>
				) : (
					<PurposeContainer
						t={t.purpose}
						purpose={purpose as PurposeType}
					/>
				)
			)}
		</>
	);
};

export default PurposeList;
