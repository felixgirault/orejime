import React, {useContext} from 'react';
import type {Purpose as PurposeType, Translations} from '../types';
import {InstanceContext} from './InstanceContext';
import PurposeContainer from './PurposeContainer';
import PurposeGroup from './PurposeGroup';
import {ConsentState} from './types/ConsentState';
import {PurposeComponent} from './types/Purpose';

interface PurposeListProps {
	translations: Translations;
	Purpose: PurposeComponent;
}

const PurposeList = ({translations, Purpose}: PurposeListProps) => {
	const {config, manager} = useContext(InstanceContext);

	return (
		<>
			{config.purposes.length > 1 ? (
				<Purpose
					isHeader
					name="orejime-all"
					label={translations.modal.globalPreferences}
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
					translations={{
						...translations.purpose,
						accept: translations.modal.acceptAll,
						decline: translations.modal.declineAll
					}}
				/>
			) : null}

			{config.purposes.map((purpose) =>
				'purposes' in purpose ? (
					<PurposeGroup
						translations={translations.purpose}
						id={purpose.id}
						title={purpose.title}
						description={purpose.description}
						purposes={purpose.purposes}
						Purpose={Purpose}
					/>
				) : (
					<PurposeContainer
						translations={translations.purpose}
						purpose={purpose as PurposeType}
						Purpose={Purpose}
					/>
				)
			)}
		</>
	);
};

export default PurposeList;
