import {diff} from '../utils/lang';
import {overwrite} from '../utils/objects';
import ConsentsMap from './ConsentsMap';
import EventEmitter from './EventEmitter';
import Tracker from './Tracker';

type ManagerEvents = {
	dirty: (dirty: boolean) => void;
	update: (diff: ConsentsMap, all: ConsentsMap) => void;
};

export default class Manager extends EventEmitter<ManagerEvents> {
	private trackers: Tracker[];
	private consents: ConsentsMap;
	private defaultConsents: ConsentsMap;
	private hasNewTrackers: boolean;

	constructor(trackers: Tracker[], consents: ConsentsMap = {}) {
		super();

		this.trackers = trackers;
		this.defaultConsents = Object.fromEntries(
			this.trackers.map(({id, default: d}) => [id, d])
		);

		this.consents = overwrite(this.defaultConsents, consents);
		this.hasNewTrackers = this.trackers.some(
			({id}) => !(id in this.consents)
		);
	}

	isDirty() {
		return this.hasNewTrackers;
	}

	areAllTrackersMandatory() {
		return this.trackers.length
			? !this.trackers.some(({isMandatory}) => !isMandatory)
			: false;
	}

	areAllTrackersEnabled() {
		return this.trackers.length
			? !this.trackers.some(({id}) => !this.consents?.[id])
			: false;
	}

	areAllTrackersDisabled() {
		return this.trackers.length
			? !this.trackers.some(
					({id, isMandatory}) => isMandatory || this.consents?.[id]
			  )
			: false;
	}

	getConsent(id: Tracker['id']) {
		return this.consents?.[id];
	}

	getAllConsents() {
		return {...this.consents};
	}

	acceptAll() {
		this.setConsents(
			Object.fromEntries(this.trackers.map(({id}) => [id, true]))
		);
	}

	declineAll() {
		this.setConsents(
			Object.fromEntries(this.trackers.map(({id}) => [id, false]))
		);
	}

	resetConsents() {
		this.setConsents({...this.defaultConsents});
	}

	setConsents(consents: ConsentsMap) {
		const updated = diff(consents, this.consents);
		this.consents = {...consents};
		this.hasNewTrackers = false;

		this.emit('update', updated, this.consents);
		this.emit('dirty', false);
	}
}
