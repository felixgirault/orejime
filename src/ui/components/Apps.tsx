import React, {useContext} from 'react';
import {useBatchStates} from '../../react';
import AppList from './AppList';
import CategorizedAppList from './CategorizedAppList';
import {InstanceContext} from './InstanceContext';

export default function Apps() {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const {trackers} = config;
	const [areAllTrackersEnabled, areAllTrackersDisabled] =
		useBatchStates(manager);

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

			{false ? (
				<CategorizedAppList trackers={trackers} />
			) : (
				<AppList trackers={trackers} />
			)}
		</div>
	);
}
