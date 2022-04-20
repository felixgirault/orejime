import React from 'react';
import type {ModalTranslations} from '../types';
import {template} from '../utils/template';

interface PoweredByLinkProps {
	t: ModalTranslations;
	className?: string;
}

const PoweredByLink = ({t, className}: PoweredByLinkProps) => {
	const text = template(t.poweredBy, {
		name: 'Orejime'
	});

	return (
		<a
			className={className}
			title={`${text} (${t.newWindowTitle})`}
			href="https://orejime.empreintedigitale.fr"
			target="_blank"
		>
			{text}
		</a>
	);
};

export default PoweredByLink;
