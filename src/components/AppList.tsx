import React, {useContext} from 'react';
import {App, Consents} from '../types';
import AppItem from './AppItem';
import {InstanceContext} from './InstanceContext';

interface Props {
	apps: App[];
}

const AppList = ({apps}: Props) => {
	const {ns} = useContext(InstanceContext);

	return (
		<ul className={ns('AppList')}>
			{apps.map((app) => (
				<li
					key={`app-${app.name}`}
					className={ns(`AppList-item AppList-item--${app.name}`)}
				>
					<AppItem app={app} />
				</li>
			))}
		</ul>
	);
};

export default AppList;
