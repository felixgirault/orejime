import React, {useContext} from 'react';
import {ModalTranslations} from '../../types';
import Dialog from '../Dialog';
import {InstanceContext} from '../InstanceContext';
import PoweredByLink from '../PoweredByLink';

interface ModalProps {
	t: ModalTranslations;
	isOpen: boolean;
	isDirty: boolean;
	onSave: () => void;
	onClose: () => void;
	children: any;
}

const Modal = ({t, isOpen, isDirty, onClose, onSave, children}: ModalProps) => {
	const {config} = useContext(InstanceContext);
	const isAlert = config.forceConsent && isDirty;

	return (
		<Dialog
			isOpen={isOpen}
			aria={{'labelledby': 'fr-consent-modal-title'}}
			htmlOpenClassName="fr-no-scroll"
			portalClassName="fr-modal fr-modal--opened"
			overlayClassName="fr-container fr-container--fluid fr-container-md"
			className="fr-grid-row fr-grid-row--center"
			appElement={config.appElement}
			containerElement={config.orejimeElement}
			onRequestClose={onClose}
			role={isAlert ? 'alertdialog' : 'dialog'}
		>
			<div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
				<div className="fr-modal__body">
					<div className="fr-modal__header">
						<button
							className="fr-link--close fr-link"
							type="button"
							title={t.closeTitle}
							onClick={onClose}
						>
							{t.close}
						</button>
					</div>

					<div className="fr-modal__content">
						<h1 id="fr-consent-modal-title" className="fr-modal__title">
							{t.title}
						</h1>

						<div className="fr-consent-manager">
							{children}

							<ul className="fr-consent-manager__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-sm">
								<li>
									<button
										className="fr-btn"
										onClick={onSave}
										title={t.saveTitle}
									>
										{t.save}
									</button>
								</li>
							</ul>
						</div>

						<p
							className="fr-mt-8w fr-text--sm"
							style={{textAlign: 'right'}}
						>
							<PoweredByLink t={t} />
						</p>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default Modal;
