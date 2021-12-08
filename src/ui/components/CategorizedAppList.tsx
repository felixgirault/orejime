import React, {useContext} from 'react';
import {Tracker} from '../types';
import AppList from './AppList';
import {InstanceContext} from './InstanceContext';

interface Props {
	trackers: Tracker[];
}

const CategorizedAppList = ({trackers}: Props) => {
	const {t, ns} = useContext(InstanceContext);
	const categorized = {
		purpose: trackers
	};

	return (
		<ul className={ns('CategorizedAppList')}>
			{Object.entries(categorized).map(([purpose, trackers]) => (
				<li className={ns('CategorizedAppList-item')}>
					<h2 className={ns('CategorizedAppList-title')}>
						{t(['purposes', purpose, 'title']) || purpose}
					</h2>

					<p className={ns('CategorizedAppList-description')}>
						{t(['purposes', purpose, 'description'])}
					</p>

					<div className={ns('CategorizedAppList-apps')}>
						<AppList trackers={trackers} />
					</div>
				</li>
			))}
		</ul>
	);
};

export default CategorizedAppList;
