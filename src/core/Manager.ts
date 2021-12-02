import {diff} from '../utils/lang';
import {omitKeys, overwrite} from '../utils/objects';
import ConsentsMap from './ConsentsMap';
import EventEmitter from './EventEmitter';
import Tracker from './Tracker';

type ManagerEvents = {
	dirty: (dirty: boolean) => void;
	update: (diff: ConsentsMap, all: ConsentsMap) => void;
	clear: () => void;
};

export default class Manager extends EventEmitter<ManagerEvents> {
	private trackers: Tracker[];
	private mandatoryTrackers: Record<Tracker['id'], true>;
	private consents: ConsentsMap;
	private defaultConsents: ConsentsMap;
	private hasNewTrackers: boolean;

	constructor(trackers: Tracker[], consents: ConsentsMap = {}) {
		super();

		this.trackers = trackers;
		this.hasNewTrackers = this.trackers.some(({id}) => !(id in consents));
		this.mandatoryTrackers = Object.fromEntries(
			this.trackers
				.filter(({isMandatory}) => isMandatory)
				.map(({id}) => [id, true])
		);

		this.defaultConsents = Object.fromEntries(
			this.trackers.map(({id, isMandatory, default: d}) => [
				id,
				isMandatory || !!d
			])
		);

		this.consents = overwrite(this.defaultConsents, consents);
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
			? !this.trackers.some(({id}) => this.consents?.[id])
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
			Object.fromEntries(
				this.trackers.map(({id, isMandatory}) => [id, isMandatory || false])
			)
		);
	}

	setConsent(id: Tracker['id'], state: boolean) {
		this.setConsents({
			[id]: state
		});
	}

	setConsents(consents: ConsentsMap) {
		const allowed = omitKeys(consents, (id) => id in this.mandatoryTrackers);

		if (!Object.keys(allowed).length) {
			return;
		}

		const updated = diff(allowed, this.consents);
		this.consents = {...this.consents, ...allowed};
		this.hasNewTrackers = false;

		this.emit('update', updated, this.consents);
		this.emit('dirty', this.isDirty());
	}

	resetConsents() {
		this.setConsents({...this.defaultConsents});
	}

	clearConsents() {
		this.resetConsents();
		this.hasNewTrackers = true;

		this.emit('clear');
		this.emit('dirty', this.isDirty());
	}

	clone() {
		return new Manager(this.trackers, this.getAllConsents());
	}
}
