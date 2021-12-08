import React, {useContext} from 'react';
import ConsentNotice, {Props as ConsentNoticeProps} from './ConsentNotice';
import Dialog from './Dialog';
import {InstanceContext} from './InstanceContext';

interface Props extends ConsentNoticeProps {
	isOpen: boolean;
}

export default function ConsentNoticeWrapper(props: Props) {
	const {t, ns, config} = useContext(InstanceContext);
	const {isOpen, ...noticeProps} = props;

	if (!config.mustNotice && !isOpen) {
		return null;
	}

	const title = t(['consentNotice', 'title']);

	if (config.mustNotice) {
		return (
			<Dialog
				isOpen={isOpen}
				elementId={config.elementID}
				appElement={config.appElement}
				portalClassName={ns('NoticePortal')}
				overlayClassName={ns('NoticeOverlay')}
				className={ns('NoticeWrapper')}
				aria-labelledby={title || undefined}
			>
				<ConsentNotice {...noticeProps} />
			</Dialog>
		);
	}

	return <ConsentNotice {...noticeProps} />;
}
