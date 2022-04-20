import React from 'react';
import {template} from '../../utils/template';
import Dialog from '../Dialog';
import PoweredByLink from '../PoweredByLink';
import type {ModalComponent} from '../types/Modal';
import {Close} from './Icons';

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
		htmlOpenClassName="orejimeHtml-WithModalOpen"
		bodyOpenClassName="orejimeBody-WithModalOpen"
		portalClassName="orejime-ModalPortal"
		overlayClassName="orejime-ModalOverlay"
		className="orejime-ModalWrapper"
		aria={{
			labelledby: 'orejime-modal-title'
		}}
	>
		<div className="orejime-Modal">
			<div className="orejime-Modal-header">
				{!isForced && (
					<button
						type="button"
						className="orejime-Modal-closeButton"
						title={t.closeTitle}
						onClick={onClose}
					>
						<Close title={t.closeTitle} />
					</button>
				)}

				<h1 className="orejime-Modal-title" id="orejime-modal-title">
					{t.title}
				</h1>

				{isForced ? (
					<p className="orejime-Modal-description">
						<strong className="orejime-Modal-changes">
							{ct.changesNotice}
						</strong>
					</p>
				) : null}

				<p className="orejime-Modal-description">
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

			<form
				className="orejime-Modal-form"
				onSubmit={(event) => {
					event.preventDefault();
					onSave();
				}}
			>
				<div className="orejime-Modal-body">{children}</div>

				<div className="orejime-Modal-footer">
					<button
						type="submit"
						className="orejime-Button orejime-Button--save orejime-Modal-saveButton"
						title={t.saveTitle}
					>
						{t.save}
					</button>

					<PoweredByLink t={t} className="orejime-Modal-poweredByLink" />
				</div>
			</form>
		</div>
	</Dialog>
);

export default Modal;
