import Manager from './core/Manager';
import {Config} from './types';
import setup from './core/setup';

const managers = new Map<Config, Manager>();

export const acquireManager = (config: Config) => {
	if (!managers.has(config)) {
		managers.set(config, setup(config));
	}

	return managers.get(config);
};
