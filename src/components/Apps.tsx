import React, {useContext} from 'react';
import AppList from './AppList';
import CategorizedAppList from './CategorizedAppList';
import {InstanceContext} from './InstanceContext';

export default function Apps() {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const {apps, categories} = config;

	return (
		<div>
			{manager.areAllTrackersMandatory() ? null : (
				<div className={ns('AppToggles')}>
					<button
						type="button"
						className={ns(
							'Button Button--info AppToggles-button AppToggles-enableAll'
						)}
						disabled={manager.areAllTrackersEnabled()}
						onClick={manager.acceptAll.bind(manager)}
					>
						{t(['acceptAll'])}
					</button>

					<button
						type="button"
						className={ns(
							'Button Button--info AppToggles-button AppToggles-disableAll'
						)}
						disabled={manager.areAllTrackersDisabled()}
						onClick={manager.declineAll.bind(manager)}
					>
						{t(['declineAll'])}
					</button>
				</div>
			)}

			{categories ? (
				<CategorizedAppList
					categories={categories}
					apps={apps}
					defaultConsents={manager.getAllConsents()}
				/>
			) : (
				<AppList apps={apps} defaultConsents={manager.getAllConsents()} />
			)}
		</div>
	);
}
