import React, {useState} from 'react';
import type {CSSProperties} from 'react';
import {ConsentState} from '../types/ConsentState';
import type {PurposeComponent} from '../types/Purpose';

const Purpose: PurposeComponent = ({
	translations: t,
	name,
	label,
	description,
	isHeader = false,
	isMandatory = false,
	isOptOut = false,
	consent,
	children,
	onChange
}) => {
	const [isExpanded, setExpanded] = useState(false);
	const id = `orejime-purpose-${name}`;

	return (
		<div
			className={
				isHeader
					? 'fr-consent-service fr-consent-manager__header'
					: 'fr-consent-service'
			}
		>
			<fieldset
				className="fr-fieldset fr-fieldset--inline"
				aria-labelledby={
					description ? `${id}-legend ${id}-description` : null
				}
			>
				<legend id={`${id}-legend`} className="fr-consent-service__title">
					{label}

					{isMandatory ? (
						<>
							{' '}
							<span title={t.mandatoryTitle}>{t.mandatory}</span>
						</>
					) : null}

					{isOptOut ? (
						<>
							{' '}
							<span title={t.optOutTitle}>{t.optOut}</span>
						</>
					) : null}
				</legend>

				<div className="fr-consent-service__radios fr-fieldset--inline">
					<div className="fr-radio-group">
						<input
							type="radio"
							id={`${id}-accept`}
							name={name}
							checked={consent === ConsentState.accepted}
							onChange={onChange.bind(null, true)}
						/>

						<label className="fr-label" htmlFor={`${id}-accept`}>
							{t.accept}
						</label>
					</div>

					<div className="fr-radio-group">
						<input
							type="radio"
							id={`${id}-decline`}
							name={name}
							disabled={isMandatory}
							checked={consent === ConsentState.declined}
							onChange={onChange.bind(null, false)}
						/>

						<label className="fr-label" htmlFor={`${id}-decline`}>
							{t.decline}
						</label>
					</div>
				</div>

				{description ? (
					<p
						id={`${id}-description`}
						className="fr-consent-service__desc"
						dangerouslySetInnerHTML={{
							__html: description
						}}
					></p>
				) : null}

				{children ? (
					<>
						<div className="fr-consent-service__collapse">
							<button
								className="fr-consent-service__collapse-btn"
								aria-expanded={isExpanded}
								aria-describedby={`${name}-legend`}
								aria-controls={`${name}-collapse`}
								onClick={() => {
									setExpanded(!isExpanded);
								}}
							>
								{t.showMore}
							</button>
						</div>

						<div
							id={`${id}-legend`}
							className={
								isExpanded
									? 'fr-consent-services fr-collapse fr-collapse--expanded'
									: 'fr-consent-services fr-collapse'
							}
							style={
								{
									maxHeight: isExpanded ? 'none' : 0,
									'--collapse': 0
								} as CSSProperties
							}
						>
							{children}
						</div>
					</>
				) : null}
			</fieldset>
		</div>
	);
};

export default Purpose;
