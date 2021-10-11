import React, {useContext} from 'react';
import {App, Consents, CssNamespace, Translate} from '../types';
import AppItem from './AppItem';
import {InstanceContext} from './InstanceContext';

interface Props {
	apps: App[];
	consents: Consents;
	onToggle: (app: App, checked: boolean) => void;
}

const AppList = ({apps, consents, onToggle}: Props) => {
	const {t, ns} = useContext(InstanceContext);

	return (
		<ul className={ns('AppList')}>
			{apps.map((app) => {
				const checked = consents[app.name];
				const handleToggle = (value: boolean) => onToggle(app, value);

				return (
					<li
						key={`app-${app.name}`}
						className={ns(`AppList-item AppList-item--${app.name}`)}
					>
						<AppItem
							checked={checked || app.required}
							onToggle={handleToggle}
							{...app}
						/>
					</li>
				);
			})}
		</ul>
	);
};

export default AppList;
