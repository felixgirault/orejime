import ConsentManager from './ConsentManager';
import {Config} from './types';

const managers = new Map<Config, ConsentManager>();

export const acquireManager = (config: Config) => {
	if (!managers.has(config)) {
		managers.set(config, new ConsentManager(config));
	}

	return managers.get(config);
};
