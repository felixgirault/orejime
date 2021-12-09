import React, {useContext} from 'react';
import {useConsent} from '../../react';
import {Tracker} from '../types';
import {InstanceContext} from './InstanceContext';

interface Props {
	tracker: Tracker;
}

export default function AppItem({tracker}: Props) {
	const {t, ns, manager} = useContext(InstanceContext);
	const {
		id,
		title,
		description,
		isMandatory = false,
		optOut = false,
		purposes = []
	} = tracker;

	const itemId = `orejime-app-item-${id}`;
	const [isChecked, setChecked] = useConsent(manager, id);

	return (
		<div className={ns('AppItem')}>
			<input
				type="checkbox"
				id={itemId}
				className={ns('AppItem-input')}
				aria-describedby={`${itemId}-description`}
				disabled={isMandatory}
				checked={isChecked}
				onChange={(event) => setChecked(event.target.checked)}
			/>

			<label
				htmlFor={itemId}
				className={ns('AppItem-label')}
				{...(isMandatory ? {tabIndex: 0} : {})}
			>
				<span className={ns('AppItem-title')}>
					{t([id, 'title']) || title}
				</span>

				{isMandatory ? (
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
						`AppItem-switch ${
							isMandatory ? 'AppItem-switch--disabled' : ''
						}`
					)}
				>
					<div className={ns('AppItem-slider')}></div>
					<div aria-hidden="true" className={ns('AppItem-switchLabel')}>
						{t([isChecked ? 'enabled' : 'disabled'])}
					</div>
				</span>
			</label>

			<div
				id={`${itemId}-description`}
				className={ns('AppItem-fullDescription')}
			>
				<p
					className={ns('AppItem-description')}
					dangerouslySetInnerHTML={{
						__html: t([id, 'description']) || description
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
