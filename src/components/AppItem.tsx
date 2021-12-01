import React, {ChangeEvent, useContext} from 'react';
import {App} from '../types';
import {InstanceContext} from './InstanceContext';

interface Props {
	app: App;
	defaultChecked: boolean;
}

export default function AppItem({app, defaultChecked}: Props) {
	const {t, ns} = useContext(InstanceContext);
	const {
		name,
		title,
		description,
		required = false,
		optOut = false,
		purposes = []
	} = app;

	const id = `orejime-app-item-${name}`;
	const isChecked = required || defaultChecked;

	return (
		<div className={ns('AppItem')}>
			<input
				id={id}
				className={ns('AppItem-input')}
				aria-describedby={`${id}-description`}
				disabled={required}
				checked={isChecked}
				type="checkbox"
			/>

			<label
				htmlFor={id}
				className={ns('AppItem-label')}
				{...(required ? {tabIndex: 0} : {})}
			>
				<span className={ns('AppItem-title')}>
					{t([name, 'title']) || title}
				</span>

				{required ? (
					<span
						className={ns('AppItem-required')}
						title={t(['app', 'required', 'description'])}
					>
						{t(['app', 'required', 'title'])}
					</span>
				) : null}

				{optOut ? (
					<span
						className={ns('AppItem-optOut')}
						title={t(['app', 'optOut', 'description'])}
					>
						{t(['app', 'optOut', 'title'])}
					</span>
				) : null}

				<span
					className={ns(
						`AppItem-switch ${required ? 'AppItem-switch--disabled' : ''}`
					)}
				>
					<div className={ns('AppItem-slider')}></div>
					<div aria-hidden="true" className={ns('AppItem-switchLabel')}>
						{t([isChecked ? 'enabled' : 'disabled'])}
					</div>
				</span>
			</label>

			<div
				id={`${id}-description`}
				className={ns('AppItem-fullDescription')}
			>
				<p
					className={ns('AppItem-description')}
					dangerouslySetInnerHTML={{
						__html: t([name, 'description']) || description
					}}
				/>

				{purposes.length > 0 ? (
					<p className={ns('AppItem-purposes')}>
						{t(['app', purposes.length > 1 ? 'purposes' : 'purpose'])}:{' '}
						{purposes
							.map((purpose) => t(['purposes', purpose]))
							.join(', ')}
					</p>
				) : null}
			</div>
		</div>
	);
}
