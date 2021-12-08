import ConsentsEffect from './ConsentsEffect';
import ConsentsMap from './ConsentsMap';
import Tracker from './Tracker';
import indexBy from './utils/indexBy';
import updateTrackerCookies from './utils/updateTrackerCookies';

export default class CookiesConsentsEffect implements ConsentsEffect {
	private readonly trackers: Record<Tracker['id'], Tracker>;

	constructor(trackers: Tracker[]) {
		this.trackers = indexBy(trackers, 'id');
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents)
			.filter(([_, consent]) => !consent)
			.map(([id]) => this.trackers[id].cookies)
			.filter((cookies) => cookies?.length)
			.forEach(updateTrackerCookies);
	}
}
