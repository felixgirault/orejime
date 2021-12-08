import Config from './Config';
import CookieConsentsRepository from './CookieConsentsRepository';
import CookiesConsentsEffect from './CookiesConsentsEffect';
import DomConsentsEffect from './DomConsentsEffect';
import Manager from './Manager';

export default (config: Config) => {
	const domEffect = new DomConsentsEffect(config.trackers);
	const cookiesEffect = new CookiesConsentsEffect(config.trackers);
	const repository = new CookieConsentsRepository(config.cookie);
	const manager = new Manager(config.trackers, repository.read());

	manager.on('update', (diff, all) => {
		domEffect.apply(diff);
		cookiesEffect.apply(diff);
		repository.write(all);
	});

	manager.on('clear', () => {
		repository.clear();
	});

	return manager;
};
