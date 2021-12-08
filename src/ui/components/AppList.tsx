import React, {useContext} from 'react';
import {Tracker} from '../types';
import AppItem from './AppItem';
import {InstanceContext} from './InstanceContext';

interface Props {
	trackers: Tracker[];
}

const AppList = ({trackers}: Props) => {
	const {ns} = useContext(InstanceContext);

	return (
		<ul className={ns('AppList')}>
			{trackers.map((app) => (
				<li
					key={`app-${app.id}`}
					className={ns(`AppList-item AppList-item--${app.id}`)}
				>
					<AppItem tracker={app} />
				</li>
			))}
		</ul>
	);
};

export default AppList;
