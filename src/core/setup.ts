import CookieConsentsRepository from './CookieConsentsRepository';
import CookieOptions from './CookieOptions';
import CookiesConsentsEffect from './CookiesConsentsEffect';
import DomConsentsEffect from './DomConsentsEffect';
import Manager from './Manager';
import Purpose from './Purpose';

export default (purposes: Purpose[], cookie: CookieOptions) => {
	const domEffect = new DomConsentsEffect(purposes);
	const cookiesEffect = new CookiesConsentsEffect(purposes);
	const repository = new CookieConsentsRepository(cookie);
	const manager = new Manager(purposes, repository.read());

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
