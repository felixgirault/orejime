import {updateAppElements} from '../utils/apps';
import ConsentsMap from './ConsentsMap';
import Tracker from './Tracker';
import TrackersManager from './TrackersManager';

export default class DomTrackersManager implements TrackersManager {
	private oneShotTrackers: ConsentsMap;
	private alreadyExecuted: ConsentsMap;

	constructor(trackers: Tracker[]) {
		this.oneShotTrackers = Object.fromEntries(
			trackers.map(({id, isOneShot}) => [id, isOneShot])
		);

		this.alreadyExecuted = Object.fromEntries(
			trackers.map(({id}) => [id, false])
		);
	}

	toggle(consents: ConsentsMap) {
		for (const [id, consent] of Object.entries(consents)) {
			if (
				consent
				&& this.oneShotTrackers?.[id]
				&& this.alreadyExecuted?.[id]
			) {
				continue;
			}

			updateAppElements(id, consent);
			this.alreadyExecuted[id] = true;
		}
	}
}
