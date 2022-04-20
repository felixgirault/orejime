import React from 'react';
import {ConsentState} from '../types/ConsentState';
import type {PurposeComponent} from '../types/Purpose';

const Purpose: PurposeComponent = ({
	translations: t,
	name,
	label,
	description,
	isMandatory = false,
	isOptOut = false,
	consent,
	children,
	onChange
}) => {
	const id = `orejime-purpose-${name}`;

	return (
		<div className="orejime-AppItem">
			<label
				htmlFor={id}
				className="orejime-AppItem-label"
				{...(isMandatory ? {tabIndex: 0} : {})}
			>
				<span className="orejime-AppItem-title">{label}</span>

				{isMandatory ? (
					<span
						className="orejime-AppItem-required"
						title={t.mandatoryTitle}
					>
						{t.mandatory}
					</span>
				) : null}

				{isOptOut ? (
					<span className="orejime-AppItem-optOut" title={t.optOutTitle}>
						{t.optOut}
					</span>
				) : null}
			</label>

			<input
				type="checkbox"
				id={id}
				className="orejime-AppItem-input"
				aria-describedby={`${id}-description`}
				disabled={isMandatory}
				checked={consent === ConsentState.accepted}
				onChange={(event) => onChange(event.target.checked)}
			/>

			{description ? (
				<div
					id={`${id}-description`}
					className="orejime-AppItem-fullDescription"
				>
					<p
						className="orejime-AppItem-description"
						dangerouslySetInnerHTML={{
							__html: description
						}}
					/>
				</div>
			) : null}
		</div>
	);
};

export default Purpose;
