import {Config} from '../types';
import CookieConsentsRepository from './CookieConsentsRepository';
import DomTrackersManager from './DomTrackersManager';
import Manager from './Manager';

export default (config: Config) => {
	const cookies = new CookieConsentsRepository(config);
	const dom = new DomTrackersManager(config.apps);
	const manager = new Manager(config.apps, cookies.read());
	manager.on('update', (diff, all) => {
		dom.toggle(diff);
		cookies.write(all);
	});

	return manager;
};
