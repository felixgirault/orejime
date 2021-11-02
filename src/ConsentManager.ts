import ObservableMap from './ConsentMap';
import ConsentRepository from './ConsentRepository';
import {App, Config, Consents, ConsentsWatcher} from './types';
import {
	areAllAppsDisabled,
	areAllAppsEnabled,
	areAllAppsRequired,
	getApp,
	getDefaultConsent,
	getDefaultConsents,
	updateAppCookies,
	updateAppElements
} from './utils/apps';
import {deprecate} from './utils/lang';

export default class ConsentManager {
	public readonly config: Config;
	public hasUserConfirmed: boolean;
	public hasUpdatedApps: boolean;
	private consentMap: ObservableMap<boolean>;
	private consentRepository: ConsentRepository;
	private states: {[appName: string]: boolean};
	private executedOnce: {[appName: string]: boolean};
	private watchers: Set<ConsentsWatcher>;

	constructor(config: Config) {
		this.config = config; // the configuration
		this.consentMap = new ObservableMap(this.defaultConsents);
		this.consentRepository = new ConsentRepository(this.consentMap, config);
		this.hasUserConfirmed = false; // true if the user actively confirmed his/her consent
		this.hasUpdatedApps = false; // true if the app config changed compared to the cookie
		this.states = {}; // keep track of the change (enabled, disabled) of individual apps
		this.executedOnce = {}; //keep track of which apps have been executed at least once
		this.watchers = new Set();
		this.loadConsents();
		this.applyConsents();

		this.consentMap.subscribe(this.notify.bind(this, 'consents'));
	}

	requiresConsent() {
		return !this.hasUserConfirmed || this.hasUpdatedApps;
	}

	get cookieName() {
		deprecate('ConsentManager::cookieName');
		return this.config.cookieName || 'orejime';
	}

	watch(watcher: ConsentsWatcher) {
		deprecate('ConsentManager::watch()', 'ConsentMap::subscribe');
		this.watchers.add(watcher);
	}

	unwatch(watcher: ConsentsWatcher) {
		deprecate('ConsentManager::watch()', 'ConsentMap::unsubscribe');
		this.watchers.delete(watcher);
	}

	notify(name: string, data: Consents) {
		deprecate('ConsentManager::watch()');
		this.watchers.forEach((watcher: ConsentsWatcher) => {
			watcher.update(this, name, data);
		});
	}

	getApp(name: string) {
		deprecate('ConsentManager::getApp()');
		return getApp(this.config.apps, name);
	}

	areAllAppsRequired() {
		return areAllAppsRequired(this.config.apps);
	}

	areAllAppsEnabled() {
		return areAllAppsEnabled(this.config.apps, this.consentMap.getAll());
	}

	areAllAppsDisabled() {
		return areAllAppsDisabled(this.config.apps, this.consentMap.getAll());
	}

	getDefaultConsent(app: App) {
		deprecate('ConsentManager::getDefaultConsent()', 'getDefaultConsent()');
		return getDefaultConsent(app, this.config.default ?? false);
	}

	get defaultConsents() {
		deprecate('ConsentManager::defaultConsents', 'getDefaultConsents()');
		return getDefaultConsents(this.config.apps, this.config.default ?? false);
	}

	declineAll() {
		this.config.apps.forEach((app) => {
			this.updateConsent(app, false);
		});
	}

	acceptAll() {
		this.config.apps.forEach((app) => {
			this.updateConsent(app, true);
		});
	}

	updateConsent(app: App, value: boolean) {
		if (app.required && !value) {
			return;
		}

		this.consentMap.set(app.name, value);
	}

	resetConsent() {
		this.consentMap.reset();
		this.consentRepository.clear();
		this.applyConsents();
		this.hasUserConfirmed = false;
	}

	getConsent(appName: string) {
		return this.consentMap.get(appName);
	}

	getConsents() {
		return this.consentMap.getAll();
	}

	loadConsents() {
		deprecate('ConsentManager::loadConsents()');

		if (!this.consentRepository.load()) {
			return;
		}

		this.hasUpdatedApps = this.config.apps.some(
			({name}) => !this.consentMap.has(name)
		);

		this.hasUserConfirmed = !this.hasUpdatedApps;
	}

	saveAndApplyConsents() {
		this.saveConsents();
		this.applyConsents();
	}

	// private
	saveConsents() {
		this.consentRepository.commit();
		this.hasUserConfirmed = true;
	}

	// private
	applyConsents() {
		this.config.apps.forEach((app) => {
			const state = this.states[app.name];
			const confirmed =
				this.hasUserConfirmed || (app.optOut ?? this.config.optOut);
			const consent = confirmed && this.getConsent(app.name);

			if (state === consent) {
				return;
			}

			this.updateAppElements(app, consent);
			this.updateAppCookies(app, consent);

			if (app.callback !== undefined) {
				app.callback(consent, app);
			}

			this.states[app.name] = consent;
		});
	}

	updateAppElements({name, onlyOnce}: App, consent: boolean) {
		if (consent) {
			if (onlyOnce && this.executedOnce[name]) {
				return;
			}

			this.executedOnce[name] = true;
		}

		updateAppElements(name, consent);
	}

	updateAppCookies({cookies}: App, consent: boolean) {
		if (!consent && cookies && cookies.length) {
			updateAppCookies(cookies);
		}
	}
}
