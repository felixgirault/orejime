import React from 'react';
import {template} from '../../utils/template';
import type {BannerComponent} from '../types/Banner';

const Banner: BannerComponent = ({
	translations: t,
	commonTranslations: ct,
	isDirty,
	isHidden,
	privacyPolicyUrl,
	onAccept,
	onDecline,
	onConfigure
}) => (
	<div className="fr-consent-banner" aria-hidden={isHidden}>
		{t.title ? <h2 className="fr-h6">{t.title}</h2> : null}

		<div className="fr-consent-banner__content">
			<p className="fr-text--sm">
				{template(t.description, {
					privacyPolicy: (
						<a key="privacyPolicyUrl" href={privacyPolicyUrl}>
							{t.privacyPolicyLabel}
						</a>
					)
				})}
			</p>

			{isDirty && <p className="fr-text--sm">{ct.changesNotice}</p>}
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
