import React from 'react';
import {imageAttributes} from '../../utils/config';
import {template} from '../../utils/template';
import type {BannerComponent} from '../types/Banner';

const Banner: BannerComponent = ({
	translations: t,
	commonTranslations: ct,
	isDirty,
	isHidden,
	privacyPolicyUrl,
	logo,
	onAccept,
	onDecline,
	onConfigure
}) => (
	<div aria-hidden={isHidden} className="Notice">
		<div className="orejime-Notice-body">
			{logo && (
				<div className="orejime-Notice-logoContainer">
					<img
						className="orejime-Notice-logo"
						{...imageAttributes(logo)}
					/>
				</div>
			)}

			<div className="orejime-Notice-text">
				{t.title ? (
					<h1 className="orejime-Notice-title" id="orejime-notice-title">
						{t.title}
					</h1>
				) : null}

				<p className="orejime-Notice-description">
					{template(t.description, {
						privacyPolicy: (
							<a key="privacyPolicyUrl" href={privacyPolicyUrl}>
								{t.privacyPolicyLabel}
							</a>
						)
					})}
				</p>
			</div>

			{isDirty && (
				<p className="orejime-Notice-changes">{ct.changesNotice}</p>
			)}

			<ul className="orejime-Notice-actions">
				<li className="orejime-Notice-actionItem orejime-Notice-actionItem--save">
					<button
						type="button"
						className="orejime-Button orejime-Button--save orejime-Notice-button orejime-Notice-saveButton"
						title={t.acceptTitle}
						onClick={onAccept}
					>
						{t.accept}
					</button>
				</li>

				<li className="orejime-Notice-actionItem orejime-Notice-actionItem--decline">
					<button
						type="button"
						className="orejime-Button orejime-Button--decline orejime-Notice-button orejime-Notice-declineButton"
						title={t.declineTitle}
						onClick={onDecline}
					>
						{t.decline}
					</button>
				</li>

				<li className="orejime-Notice-actionItem orejime-Notice-actionItem--info">
					<button
						type="button"
						className="orejime-Button orejime-Button--info orejime-Notice-learnMoreButton"
						title={t.configureTitle}
						onClick={onConfigure}
					>
						{t.configure}
					</button>
				</li>
			</ul>
		</div>
	</div>
);

export default Banner;
