import React, {useEffect, useLayoutEffect, useState} from 'react';
import ReactModal, {Props as ReactModalProps} from 'react-modal';

interface Props extends ReactModalProps {
	isOpen: boolean;
	elementId: string;
	appElement: HTMLElement;
	children: any;

	// the scroll position stuff is for iOS to work correctly
	// when we want to prevent normal website scrolling with
	// the modal opened
	//
	// /!\ this requires specific CSS to work. For example,
	// if `htmlOpenClassName = 'modal-open'`:
	//
	// ```
	// .modal-open {
	//   height: 100%;
	// }
	//
	// .modal-open body {
	//   position: fixed;
	//   overflow: hidden;
	//   height: 100%;
	//   width: 100%;
	// }
	// ```
	handleScrollPosition?: boolean;
}

export default function Dialog({
	isOpen,
	elementId,
	appElement,
	handleScrollPosition = true,
	children,
	...reactModalProps
}: Props) {
	const [scrollPosition, setScrollPosition] = useState<number>(null);

	useLayoutEffect(() => {
		if (isOpen && scrollPosition === null) {
			setScrollPosition(window.pageYOffset);
		}
	});

	useEffect(() => {
		if (!isOpen && scrollPosition !== null) {
			// setTimeout() avoids a race condition of some sort
			setTimeout(() => {
				if (handleScrollPosition) {
					window.scrollTo(window.pageXOffset, this.scrollPosition);
				}

				this.scrollPosition = null;
			}, 0);
		}
	});

	useEffect(() => {
		ReactModal.setAppElement(appElement);
	}, []);

	return (
		<ReactModal
			isOpen={isOpen}
			parentSelector={() => document.getElementById(elementId)}
			htmlOpenClassName="orejimeHtml-WithModalOpen"
			bodyOpenClassName="orejimeBody-WithModalOpen"
			{...reactModalProps}
		>
			{children}
		</ReactModal>
	);
}
