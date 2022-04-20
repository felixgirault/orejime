import type {ElementReference} from '../types';

export const getElement = (
	reference: ElementReference,
	defaultElement = document.body
) => {
	if (!reference) {
		return defaultElement;
	}

	if (typeof reference === 'string') {
		return document.getElementById(reference) as HTMLElement;
	}

	return reference;
};

// TODO fix this, seems odd
export const getRootElement = (orejimeElement: ElementReference) => {
	let [id, container] =
		typeof orejimeElement === 'string'
			? [orejimeElement, document.getElementById(orejimeElement)]
			: ['orejime', orejimeElement];

	if (!container) {
		container = document.createElement('div');
		container.id = id;
		document.body.insertBefore(container, document.body.firstChild);
	}

	let root = container.querySelector('#orejime-root');

	if (root) {
		return root;
	}

	root = document.createElement('div');
	root.id = 'orejime-root';
	container.appendChild(root);
	return root;
};
