import {Config} from '../types';

export function getPurposes(config: Config) {
	const purposes = new Set<string>([]);
	for (let i = 0; i < config.apps.length; i++) {
		const appPurposes = config.apps[i].purposes || [];
		for (let j = 0; j < appPurposes.length; j++) purposes.add(appPurposes[j]);
	}
	return Array.from(purposes);
}
