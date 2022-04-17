import React, {useContext} from 'react';
import {useBatchStates} from '../utils/hooks';
import AppList from './AppList';
import {InstanceContext} from './InstanceContext';

export default function Apps() {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const {purposes} = config;
	const [areAllTrackersEnabled, areAllTrackersDisabled] = useBatchStates(
		manager.purposes
	);

	return (
		<div>
			{manager.areAllPurposesMandatory() ? null : (
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

			<AppList purposes={purposes} />
		</div>
	);
}
