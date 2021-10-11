import React, {useContext} from 'react';
import useConsents from '../hooks/useConsents';
import AppList from './AppList';
import CategorizedAppList from './CategorizedAppList';
import {InstanceContext} from './InstanceContext';

export default function Apps() {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const consents = useConsents(manager);
	const {apps, categories} = config;

	return (
		<div>
			{manager.areAllAppsRequired() ? null : (
				<div className={ns('AppToggles')}>
					<button
						type="button"
						className={ns(
							'Button Button--info AppToggles-button AppToggles-enableAll'
						)}
						disabled={manager.areAllAppsEnabled()}
						onClick={manager.acceptAll.bind(manager)}
					>
						{t(['acceptAll'])}
					</button>

					<button
						type="button"
						className={ns(
							'Button Button--info AppToggles-button AppToggles-disableAll'
						)}
						disabled={manager.areAllAppsDisabled()}
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
					consents={consents}
					onToggle={manager.updateConsent.bind(manager)}
				/>
			) : (
				<AppList
					apps={apps}
					consents={consents}
					onToggle={manager.updateConsent.bind(manager)}
				/>
			)}
		</div>
	);
}
