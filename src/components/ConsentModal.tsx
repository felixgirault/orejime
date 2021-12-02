import React, {FormEvent, useContext} from 'react';
import ConsentsMap from '../core/ConsentsMap';
import useIsDirty from '../hooks/useIsDirty';
import {template} from '../utils/template';
import Apps from './Apps';
import Dialog from './Dialog';
import {Close} from './Icons';
import {InstanceContext} from './InstanceContext';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onSave: (consents: ConsentsMap) => void;
}

export default function ConsentModal({isOpen, onClose, onSave}: Props) {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const isDirty = useIsDirty(manager);
	const isAlert = config.mustConsent && isDirty;
	const tempManager = manager.clone(); // acts as a store for tracker states
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSave(tempManager.getAllConsents());
	};

	return (
		<Dialog
			isOpen={isOpen}
			aria={{'labelledby': 'orejime-modal-title'}}
			portalClassName={ns('ModalPortal')}
			overlayClassName={ns('ModalOverlay')}
			className={ns('ModalWrapper')}
			elementId={config.elementID}
			appElement={config.appElement}
			onRequestClose={onClose}
			role={isAlert ? 'alertdialog' : 'dialog'}
		>
			<div className={ns('Modal')}>
				<div className={ns('Modal-header')}>
					{!isAlert && (
						<button
							title={t(['close'])}
							className={ns('Modal-closeButton')}
							type="button"
							onClick={onClose}
						>
							<Close />
						</button>
					)}

					<h1 className={ns('Modal-title')} id="orejime-modal-title">
						{t(['consentModal', 'title'])}
					</h1>
					<p className={ns('Modal-description')}>
						{isDirty && (config.mustConsent || config.noNotice) && (
							<p className={ns('Modal-description')}>
								<strong className={ns('Modal-changes')}>
									{t(['consentNotice', 'changeDescription'])}
								</strong>
							</p>
						)}
						{t(['consentModal', 'description'])}&nbsp;
						{template(t(['consentModal', 'privacyPolicy', 'text']), {
							privacyPolicy: (
								<a
									key="privacyPolicyLink"
									className={ns('Modal-privacyPolicyLink')}
									onClick={(e) => {
										onClose();
									}}
									href={config.privacyPolicy}
								>
									{t(['consentModal', 'privacyPolicy', 'name'])}
								</a>
							)
						})}
					</p>
				</div>

				<form className={ns('Modal-form')} onSubmit={handleSubmit}>
					<div className={ns('Modal-body')}>
						<InstanceContext.Provider
							value={{t, ns, config, manager: tempManager}}
						>
							<Apps />
						</InstanceContext.Provider>
					</div>

					<div className={ns('Modal-footer')}>
						<button
							className={ns('Button Button--save Modal-saveButton')}
							type="submit"
							title={t(['saveData'])}
						>
							{t(['save'])}
						</button>

						<a
							target="_blank"
							className={ns('Modal-poweredByLink')}
							href={
								config.poweredBy ||
								'https://orejime.empreintedigitale.fr'
							}
							title={`${t(['poweredBy'])} (${t(['newWindow'])})`}
						>
							{t(['poweredBy'])}
						</a>
					</div>
				</form>
			</div>
		</Dialog>
	);
}
