import {Purpose} from '../types';
import AppItem from './AppItem';
import {InstanceContext} from './InstanceContext';
import React, {useContext} from 'react';

interface Props {
	purposes: Purpose[];
}

const AppList = ({purposes}: Props) => {
	const {ns} = useContext(InstanceContext);

	return (
		<ul className={ns('AppList')}>
			{purposes.map((app) => (
				<li
					key={`app-${app.id}`}
					className={ns(`AppList-item AppList-item--${app.id}`)}
				>
					<AppItem purpose={app} />
				</li>
			))}
		</ul>
	);
};

export default AppList;
