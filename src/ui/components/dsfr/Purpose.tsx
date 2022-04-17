import React, {useState} from 'react';
import type {CSSProperties} from 'react';
import {PurposeTranslations} from '../../types';

export enum ConsentState {
	accepted,
	declined,
	unknown
}

export interface PurposeProps {
	t: PurposeTranslations;
	name: string;
	label: string;
	description?: string;
	isHeader?: boolean;
	isAcceptable?: boolean;
	isDeclinable?: boolean;
	consent: ConsentState;
	children?: any;
	onChange: (consent: boolean) => void;
}

const Purpose = ({
	t,
	name,
	label,
	description,
	isHeader = false,
	isAcceptable = true,
	isDeclinable = true,
	consent,
	children,
	onChange
}: PurposeProps) => {
	const [isExpanded, setExpanded] = useState(false);

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
					description ? `${name}-legend ${name}-description` : null
				}
			>
				<legend
					id={`orejime-${name}-legend`}
					className="fr-consent-service__title"
				>
					{label}
					{isDeclinable ? '' : ` ${t.mandatory}`}
				</legend>

				<div className="fr-consent-service__radios fr-fieldset--inline">
					<div className="fr-radio-group">
						<input
							type="radio"
							id={`orejime-${name}-accept`}
							name={name}
							disabled={!isAcceptable}
							checked={consent === ConsentState.accepted}
							onChange={onChange.bind(null, true)}
						/>

						<label
							className="fr-label"
							htmlFor={`orejime-${name}-accept`}
						>
							{t.accept}
						</label>
					</div>

					<div className="fr-radio-group">
						<input
							type="radio"
							id={`orejime-${name}-decline`}
							name={name}
							disabled={!isDeclinable}
							checked={consent === ConsentState.declined}
							onChange={onChange.bind(null, false)}
						/>

						<label
							className="fr-label"
							htmlFor={`orejime-${name}-decline`}
						>
							{t.decline}
						</label>
					</div>
				</div>

				{description ? (
					<p
						id={`orejime-${name}-description`}
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
							id={`orejime-${name}-legend`}
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
