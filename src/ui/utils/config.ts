import type {Config, ImageDescriptor, Purpose, PurposeList} from '../types';
import {language} from './i18n';

export const DefaultConfig: Partial<Config> = {
	orejimeElement: 'orejime',
	stylePrefix: 'orejime',
	defaultConsent: true,
	forceConsent: false,
	preventNavigation: false,
	lang: language(),
	purposes: [],
	debug: false
};

export const validateConfig = (config: Config) => {
	if (!Object.keys(config.purposes).length) {
		throw new Error('Orejime: no `purposes` to manage');
	}

	if (!config.privacyPolicyUrl.length) {
		throw new Error('Orejime: missing `privacyPolicyUrl`');
	}
};

// Strips groups from a list of purposes and purpose groups.
export const purposesOnly = (purposes: PurposeList): Purpose[] =>
	purposes.flatMap((purpose) =>
		'purposes' in purpose
			? purposesOnly(purpose.purposes)
			: [purpose as Purpose]
	);

export const imageAttributes = (image: ImageDescriptor) => {
	if (typeof image === 'string') {
		return {
			src: image,
			alt: ''
		};
	}

	return {
		src: '',
		alt: '',
		...image
	};
};
