import ConsentsMap from './ConsentsMap';
import EventEmitter from './EventEmitter';
import Purpose from './Purpose';
import {withoutAll} from './utils/arrays';
import {diff, overwrite} from './utils/objects';
import {
	acceptedConsents,
	areAllPurposesDisabled,
	areAllPurposesEnabled,
	areAllPurposesMandatory,
	declinedConsents,
	defaultConsents,
	isConsentValid
} from './utils/purposes';

type ManagerEvents = {
	dirty: (dirty: boolean) => void;
	update: (diff: ConsentsMap, all: ConsentsMap) => void;
	clear: () => void;
};

export default class Manager extends EventEmitter<ManagerEvents> {
	private readonly purposes: Purpose[];
	private readonly mandatoryConsents: ConsentsMap;
	private readonly defaultConsents: ConsentsMap;
	private invalidConsentsIds: Purpose['id'][];
	private consents: ConsentsMap;

	constructor(purposes: Purpose[], consents: ConsentsMap = {}) {
		super();

		// The manager will be considered dirty until these
		// consents are made valid (i.e. set, and set
		// accordingly to their mandatory status)
		this.invalidConsentsIds = purposes
			.filter((purpose) => !isConsentValid(purpose, consents))
			.map(({id}) => id);

		this.defaultConsents = defaultConsents(purposes);
		this.mandatoryConsents = acceptedConsents(
			purposes.filter(({isMandatory}) => isMandatory)
		);

		this.purposes = purposes;
		this.consents = overwrite(this.defaultConsents, consents);
	}

	// Clones data, but not event handlers.
	clone() {
		return new Manager(this.purposes, this.getAllConsents());
	}

	isDirty() {
		return this.invalidConsentsIds.length > 0;
	}

	areAllPurposesMandatory() {
		return areAllPurposesMandatory(this.purposes);
	}

	areAllPurposesEnabled() {
		return areAllPurposesEnabled(this.purposes, this.consents);
	}

	areAllPurposesDisabled() {
		return areAllPurposesDisabled(this.purposes, this.consents);
	}

	getConsent(id: Purpose['id']) {
		return this.consents?.[id];
	}

	getAllConsents() {
		return {...this.consents};
	}

	acceptAll() {
		this.setConsents(acceptedConsents(this.purposes));
	}

	declineAll() {
		this.setConsents(declinedConsents(this.purposes));
	}

	setConsent(id: Purpose['id'], state: boolean) {
		this.setConsents({
			[id]: state
		});
	}

	setConsents(consents: ConsentsMap) {
		this.updateConsents(consents);

		this.invalidConsentsIds = withoutAll(
			this.invalidConsentsIds,
			Object.keys(consents)
		);

		this.emit('dirty', this.isDirty());
	}

	resetConsents() {
		this.setConsents({...this.defaultConsents});
	}

	clearConsents() {
		this.updateConsents({...this.defaultConsents});

		this.invalidConsentsIds = withoutAll(
			this.purposes.map(({id}) => id),
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
