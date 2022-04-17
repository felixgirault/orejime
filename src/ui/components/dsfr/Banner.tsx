import React from 'react';
import type {BannerTranslations} from '../../types';
import {template} from '../../utils/template';

interface BannerProps {
	t: BannerTranslations;
	isDirty: boolean;
	isModalOpen: boolean;
	privacyPolicyUrl: string;
	onAccept: () => void;
	onDecline: () => void;
	onConfigure: () => void;
}

const Banner = ({
	t,
	isDirty,
	isModalOpen,
	privacyPolicyUrl,
	onAccept,
	onDecline,
	onConfigure
}: BannerProps) => (
	<div className="fr-consent-banner" aria-hidden={isModalOpen}>
		{t.title ? <h2 className="fr-h6">{t.title}</h2> : null}

		<div className="fr-consent-banner__content">
			<p className="fr-text--sm">
				{t.description}

				{template(t.privacyPolicy, {
					privacyPolicy: (
						<a key="privacyPolicyUrl" href={privacyPolicyUrl}>
							{t.privacyPolicyTitle}
						</a>
					)
				})}
			</p>

			{isDirty && <p className="fr-text--sm">{t.dirtyNotice}</p>}
		</div>

		<ul className="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
			<li>
				<button className="fr-btn" title={t.acceptTitle} onClick={onAccept}>
					{t.accept}
				</button>
			</li>
			<li>
				<button
					className="fr-btn"
					title={t.declineTitle}
					onClick={onDecline}
				>
					{t.decline}
				</button>
			</li>
			<li>
				<button
					className="fr-btn fr-btn--secondary"
					title={t.configureTitle}
					onClick={onConfigure}
				>
					{t.configure}
				</button>
			</li>
		</ul>
	</div>
);

export default Banner;
