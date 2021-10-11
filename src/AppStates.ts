import {Consents} from './types';

type ConsentMapWatcher = (consents: Consents) => void;

export default class AppStates {
	private watchers: Set<ConsentMapWatcher>;
	public values: Consents;

	constructor(values: Consents) {
		this.watchers = new Set();
		this.values = values;
	}

	get(key: string) {
		return this.values[key] || false;
	}

	set(key: string, value: boolean) {
		this.values[key] = value;
		this.notify();
	}

	setAll(values: Consents) {
		this.values = {...values};
		this.notify();
	}

	watch(watcher: ConsentMapWatcher) {
		this.watchers.add(watcher);
	}

	unwatch(watcher: ConsentMapWatcher) {
		this.watchers.delete(watcher);
	}

	private notify() {
		this.watchers.forEach((watch) => {
			watch({...this.values});
		});
	}
}
