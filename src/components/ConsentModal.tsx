import React, {FormEvent, useContext} from 'react';
import {template} from '../utils/template';
import Apps from './Apps';
import Dialog from './Dialog';
import {Close} from './Icons';
import {InstanceContext} from './InstanceContext';

interface Props {
	isOpen: boolean;
	onHideRequest: () => void;
	onSaveRequest: () => void;
}

export default function ConsentModal({
	isOpen,
	onHideRequest,
	onSaveRequest
}: Props) {
	const {t, ns, config, manager} = useContext(InstanceContext);
	const isAlert = config.mustConsent && manager.requiresConsent();
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
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
			onRequestClose={onHideRequest}
			role={isAlert ? 'alertdialog' : 'dialog'}
		>
			<div className={ns('Modal')}>
				<div className={ns('Modal-header')}>
					{!isAlert && (
						<button
							title={t(['close'])}
							className={ns('Modal-closeButton')}
							type="button"
							onClick={onHideRequest}
						>
							<Close />
						</button>
					)}

					<h1 className={ns('Modal-title')} id="orejime-modal-title">
						{t(['consentModal', 'title'])}
					</h1>
					<p className={ns('Modal-description')}>
						{manager.hasUpdatedApps &&
							(config.mustConsent || config.noNotice) && (
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
										onHideRequest();
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
						<Apps />
					</div>

					<div className={ns('Modal-footer')}>
						<button
							className={ns('Button Button--save Modal-saveButton')}
							onClick={onSaveRequest}
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
