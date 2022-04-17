import React, {useContext} from 'react';
import {getPurposes} from '../utils/apps';
import {getLogoAlternative, getLogoUrl} from '../utils/config';
import {useIsDirty} from '../utils/hooks';
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

	return (
		<div
			aria-hidden={isModalOpen}
			className={ns(
				`Notice${config.forceNotice ? ' Notice--mandatory' : ''}`
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
						{t(['consentNotice', 'description'])}
						{template(t(['consentNotice', 'privacyPolicy', 'text']), {
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className={ns('Notice-privacyPolicyLink')}
									href={config.privacyPolicyUrl}
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
					<li
						className={[
							ns('Notice-actionItem'),
							ns('Notice-actionItem--save')
						].join(' ')}
					>
						<button
							className={[
								ns('Button'),
								ns('Button--save'),
								ns('Notice-button'),
								ns('Notice-saveButton')
							].join(' ')}
							type="button"
							title={t(['acceptTitle']) as string}
							onClick={onAcceptAll}
						>
							{t(['accept'])}
						</button>
					</li>

					<li
						className={[
							ns('Notice-actionItem'),
							ns('Notice-actionItem--decline')
						].join(' ')}
					>
						<button
							className={[
								ns('Button'),
								ns('Button--decline'),
								ns('Notice-button'),
								ns('Notice-declineButton')
							].join(' ')}
							type="button"
							onClick={onDeclineAll}
						>
							{t(['decline'])}
						</button>
					</li>

					<li
						className={[
							ns('Notice-actionItem'),
							ns('Notice-actionItem--info')
						].join(' ')}
					>
						<button
							type="button"
							className={[
								ns('Button'),
								ns('Button--info'),
								ns('Notice-learnMoreButton')
							].join(' ')}
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
