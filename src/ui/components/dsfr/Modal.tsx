import React from 'react';
import {template} from '../../utils/template';
import Dialog from '../Dialog';
import PoweredByLink from '../PoweredByLink';
import type {ModalComponent} from '../types/Modal';

const Modal: ModalComponent = ({
	translations: t,
	commonTranslations: ct,
	isForced,
	privacyPolicyUrl,
	onClose,
	onSave,
	children
}) => (
	<Dialog
		isAlert={isForced}
		onRequestClose={onClose}
		htmlOpenClassName="fr-no-scroll"
		portalClassName="fr-modal fr-modal--opened"
		overlayClassName="fr-container fr-container--fluid fr-container-md"
		className="fr-grid-row fr-grid-row--center"
		aria={{
			labelledby: 'fr-consent-modal-title'
		}}
	>
		<div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
			<div className="fr-modal__body">
				<div className="fr-modal__header">
					{isForced ? null : (
						<button
							type="button"
							className="fr-link--close fr-link"
							title={t.closeTitle}
							onClick={onClose}
						>
							{t.close}
						</button>
					)}
				</div>

				<div className="fr-modal__content">
					<h1 id="fr-consent-modal-title" className="fr-modal__title">
						{t.title}
					</h1>

					<div>
						{isForced ? (
							<p>
								<strong>{ct.changesNotice}</strong>
							</p>
						) : null}

						<p>
							{template(t.description, {
								privacyPolicy: (
									<a
										key="privacyPolicyLink"
										href={privacyPolicyUrl}
										onClick={onClose}
									>
										{t.privacyPolicyLabel}
									</a>
								)
							})}
						</p>
					</div>

					<div className="fr-consent-manager">
						{children}

						<ul className="fr-consent-manager__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-sm">
							<li>
								<button
									className="fr-btn"
									title={t.saveTitle}
									onClick={onSave}
								>
									{t.save}
								</button>
							</li>
						</ul>
					</div>

					<p className="fr-mt-8w fr-text--sm" style={{textAlign: 'right'}}>
						<PoweredByLink t={t} />
					</p>
				</div>
			</div>
		</div>
	</Dialog>
);

export default Modal;
