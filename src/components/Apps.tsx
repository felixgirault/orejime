import React, {useContext} from 'react';
import useBatchStates from '../hooks/useBatchStates';
import AppList from './AppList';
import CategorizedAppList from './CategorizedAppList';
import {InstanceContext} from './InstanceContext';

export default function Apps() {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const {apps, categories} = config;
	const [areAllTrackersEnabled, areAllTrackersDisabled] = useBatchStates(
		manager
	);

	return (
		<div>
			{manager.areAllTrackersMandatory() ? null : (
				<div className={ns('AppToggles')}>
					<button
						type="button"
						className={ns(
							'Button Button--info AppToggles-button AppToggles-enableAll'
						)}
						disabled={areAllTrackersEnabled}
						onClick={manager.acceptAll.bind(manager)}
					>
						{t(['acceptAll'])}
					</button>

					<button
						type="button"
						className={ns(
							'Button Button--info AppToggles-button AppToggles-disableAll'
						)}
						disabled={areAllTrackersDisabled}
						onClick={manager.declineAll.bind(manager)}
					>
						{t(['declineAll'])}
					</button>
				</div>
			)}

			{categories ? (
				<CategorizedAppList categories={categories} apps={apps} />
			) : (
				<AppList apps={apps} />
			)}
		</div>
	);
}
