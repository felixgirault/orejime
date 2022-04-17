import React, {useEffect, useLayoutEffect, useState} from 'react';
import ReactModal from 'react-modal';
import type {Props as ReactModalProps} from 'react-modal';
import {ElementReference} from '../types';
import {getElement} from '../utils/dom';
import {useBeforeRender} from '../utils/hooks';

interface DialogProps extends Omit<ReactModalProps, 'appElement'> {
	isOpen: boolean;
	appElement?: ElementReference;
	containerElement?: ElementReference;
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
	appElement,
	containerElement,
	handleScrollPosition = true,
	children,
	...reactModalProps
}: DialogProps) {
	const [scrollPosition, setScrollPosition] = useState<number | null>(null);

	useBeforeRender(() => {
		if (appElement) {
			ReactModal.setAppElement(appElement);
		}
	});

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
					window.scrollTo(window.pageXOffset, scrollPosition);
				}

				setScrollPosition(null);
			}, 0);
		}
	});

	return (
		<ReactModal
			{...reactModalProps}
			isOpen={isOpen}
			parentSelector={() => getElement(containerElement)}
		>
			{children}
		</ReactModal>
	);
}
