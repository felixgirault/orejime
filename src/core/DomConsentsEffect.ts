import ConsentsEffect from './ConsentsEffect';
import ConsentsMap from './ConsentsMap';
import Tracker from './Tracker';
import updateTrackerElements from './utils/updateTrackerElements';

export default class DomConsentsEffect implements ConsentsEffect {
	private readonly oneShotTrackers: ConsentsMap;
	private readonly alreadyExecuted: ConsentsMap;

	constructor(trackers: Tracker[]) {
		this.oneShotTrackers = Object.fromEntries(
			trackers.map(({id, isOneShot}) => [id, !!isOneShot])
		);

		this.alreadyExecuted = Object.fromEntries(
			trackers.map(({id}) => [id, false])
		);
	}

	apply(consents: ConsentsMap) {
		Object.entries(consents)
			.filter(
				([id, consent]) =>
					!consent ||
					!this.oneShotTrackers[id] ||
					!this.alreadyExecuted?.[id]
			)
			.forEach(([id, consent]) => {
				updateTrackerElements(id, consent);
				this.alreadyExecuted[id] = true;
			});
	}
}
