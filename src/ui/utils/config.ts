import {Config, Purpose, PurposeList} from '../types';

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

export const getLogoUrl = (config: Config) =>
	typeof config.logo == 'object' ? config.logo.src : (config.logo as string);

export const getLogoAlternative = (config: Config) =>
	typeof config.logo == 'object' && config.logo.alt ? config.logo.alt : '';
