import React, {useContext} from 'react';
import useIsDirty from '../hooks/useIsDirty';
import {getPurposes} from '../utils/apps';
import {getLogoAlternative, getLogoUrl} from '../utils/config';
import {template} from '../utils/template';
import {InstanceContext} from './InstanceContext';

export interface Props {
	isModalOpen: boolean;
	onAcceptAll: () => void;
	onDeclineAll: () => void;
	onConfigure: () => void;
}

export default function ConsentNotice({
	isModalOpen,
	onAcceptAll,
	onDeclineAll,
	onConfigure
}: Props) {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const isDirty = useIsDirty(manager);
	const title = t(['consentNotice', 'title']);
	const purposes = getPurposes(config.apps);
	const purposesText = purposes
		.map((purpose) => t(['purposes', purpose]))
		.join(', ');

	return (
		<div
			aria-hidden={isModalOpen}
			className={ns(
				`Notice${config.mustNotice ? ' Notice--mandatory' : ''}`
			)}
		>
			<div className={ns('Notice-body')}>
				{config.logo && (
					<div className={ns('Notice-logoContainer')}>
						<img
							src={getLogoUrl(config)}
							alt={getLogoAlternative(config)}
							className={ns('Notice-logo')}
						/>
					</div>
				)}

				<div className={ns('Notice-text')}>
					{title && (
						<h1 className={ns('Notice-title')} id="orejime-notice-title">
							{title}
						</h1>
					)}

					<p className={ns('Notice-description')}>
						{template(t(['consentNotice', 'description']), {
							purposes: (
								<strong
									key="purposes"
									className={ns('Notice-purposes')}
								>
									{purposesText}
								</strong>
							)
						})}
						{template(t(['consentNotice', 'privacyPolicy', 'text']), {
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className={ns('Notice-privacyPolicyLink')}
									href={config.privacyPolicy}
								>
									{t(['consentNotice', 'privacyPolicy', 'name'])}
								</a>
							)
						})}
					</p>
				</div>

				{isDirty && (
					<p className={ns('Notice-changes')}>
						{t(['consentNotice', 'changeDescription'])}
					</p>
				)}

				<ul className={ns('Notice-actions')}>
					<li className={ns('Notice-actionItem Notice-actionItem--save')}>
						<button
							className={ns(
								'Button Button--save Notice-button Notice-saveButton'
							)}
							type="button"
							title={t(['acceptTitle']) as string}
							onClick={onAcceptAll}
						>
							{t(['accept'])}
						</button>
					</li>

					<li
						className={ns('Notice-actionItem Notice-actionItem--decline')}
					>
						<button
							className={ns(
								'Button Button--decline Notice-button Notice-declineButton'
							)}
							type="button"
							onClick={onDeclineAll}
						>
							{t(['decline'])}
						</button>
					</li>

					<li className={ns('Notice-actionItem Notice-actionItem--info')}>
						<button
							type="button"
							className={ns(
								'Button Button--info Notice-learnMoreButton'
							)}
							onClick={onConfigure}
						>
							{t(['consentNotice', 'learnMore'])}
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}
