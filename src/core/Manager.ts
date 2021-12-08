import ConsentsMap from './ConsentsMap';
import EventEmitter from './EventEmitter';
import Tracker from './Tracker';
import diff from './utils/diff';
import overwrite from './utils/overwrite';
import withoutAll from './utils/withoutAll';

type ManagerEvents = {
	dirty: (dirty: boolean) => void;
	update: (diff: ConsentsMap, all: ConsentsMap) => void;
	clear: () => void;
};

export default class Manager extends EventEmitter<ManagerEvents> {
	private readonly trackers: Tracker[];
	private readonly mandatoryConsents: ConsentsMap;
	private readonly defaultConsents: ConsentsMap;
	private invalidConsents: Tracker['id'][];
	private consents: ConsentsMap;

	constructor(trackers: Tracker[], consents: ConsentsMap = {}) {
		super();

		this.trackers = trackers;

		// The manager will be considered dirty until these
		// consents are made valid (i.e. set, and set
		// accordingly to their mandatory status)
		this.invalidConsents = this.trackers
			.filter((tracker) =>
				tracker.isMandatory
					? !consents?.[tracker.id]
					: !(tracker.id in consents)
			)
			.map(({id}) => id);

		this.mandatoryConsents = Object.fromEntries(
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

	// Clones data, but no event handlers.
	clone() {
		return new Manager(this.trackers, this.getAllConsents());
	}

	isDirty() {
		return this.invalidConsents.length > 0;
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
			? !this.trackers.some(({id, isMandatory}) => !isMandatory && this.consents?.[id])
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

	setConsent(id: Tracker['id'], state: boolean) {
		this.setConsents({
			[id]: state
		});
	}

	setConsents(consents: ConsentsMap) {
		this.updateConsents(consents);

		this.invalidConsents = withoutAll(
			this.invalidConsents,
			Object.keys(consents)
		);

		this.emit('dirty', this.isDirty());
	}

	resetConsents() {
		this.setConsents({...this.defaultConsents});
	}

	clearConsents() {
		this.updateConsents({...this.defaultConsents});

		this.invalidConsents = withoutAll(
			this.trackers.map(({id}) => id),
			Object.keys(this.mandatoryConsents)
		);

		this.emit('clear');
		this.emit('dirty', this.isDirty());
	}

	private updateConsents(consents: ConsentsMap) {
		const fixed = overwrite(consents, this.mandatoryConsents);
		const updated = diff(fixed, this.consents);

		this.consents = {
			...this.consents,
			...fixed
		};

		this.emit('update', updated, this.consents);
	}
}
