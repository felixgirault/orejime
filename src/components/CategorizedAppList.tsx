import React, {useContext} from 'react';
import {App, Category, Consents} from '../types';
import {pickApps} from '../utils/apps';
import AppList from './AppList';
import {InstanceContext} from './InstanceContext';

interface Props {
	categories: Category[];
	apps: App[];
}

const CategorizedAppList = ({categories, apps}: Props) => {
	const {t, ns} = useContext(InstanceContext);

	return (
		<ul className={ns('CategorizedAppList')}>
			{categories.map(({name, title, description, apps: appNames}) => (
				<li className={ns('CategorizedAppList-item')}>
					<h2 className={ns('CategorizedAppList-title')}>
						{t(['categories', name, 'title']) || title}
					</h2>

					<p className={ns('CategorizedAppList-description')}>
						{t(['categories', name, 'description']) || description}
					</p>

					<div className={ns('CategorizedAppList-apps')}>
						<AppList apps={pickApps(apps, appNames)} />
					</div>
				</li>
			))}
		</ul>
	);
};

export default CategorizedAppList;
