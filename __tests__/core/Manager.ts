import Manager from '../../src/core/Manager';
import Tracker from '../../src/core/Tracker';

describe('Consents', () => {
	const tracker = (props: Partial<Tracker> = {}): Tracker => {
		// https://stackoverflow.com/a/28997977
		const id = (Math.random() * 1e20).toString(36);

		return {
			id,
			cookies: [],
			...props
		};
	};

	test('areAllTrackersMandatory', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllTrackersMandatory()).toBeFalsy();

		const managerB = new Manager([tracker(), tracker({isMandatory: true})]);

		expect(managerB.areAllTrackersMandatory()).toBeFalsy();

		const managerC = new Manager([tracker({isMandatory: true})]);

		expect(managerC.areAllTrackersMandatory()).toBeTruthy();
	});

	test('areAllTrackersEnabled', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllTrackersMandatory()).toBeFalsy();

		const managerB = new Manager([tracker(), tracker({isMandatory: true})]);

		expect(managerB.areAllTrackersMandatory()).toBeFalsy();

		const managerC = new Manager([tracker({isMandatory: true})]);

		expect(managerC.areAllTrackersMandatory()).toBeTruthy();
	});

	test('getConsent', () => {
		const trackerA = tracker();
		const trackerB = tracker();
		const manager = new Manager([trackerA, trackerB], {
			[trackerA.id]: true
		});

		expect(manager.getConsent(trackerA.id)).toBeTruthy();
		expect(manager.getConsent(trackerB.id)).toBeFalsy();
		expect(manager.getConsent('unset')).toBeFalsy();
	});

	test('getAllConsents', () => {
		const trackerA = tracker();
		const trackerB = tracker();
		const consents = {
			[trackerA.id]: true,
			[trackerB.id]: true
		};

		const managerA = new Manager([], consents);

		expect(managerA.getAllConsents()).toEqual({});

		const managerB = new Manager([trackerA], consents);

		expect(managerB.getAllConsents()).toEqual({
			[trackerA.id]: consents[trackerA.id]
		});
	});

	test('acceptAll', () => {
		const trackerA = tracker();
		const trackerB = tracker();
		const dirtyCallback = jest.fn();
		const updateCallback = jest.fn();
		const expectedConsents = {
			[trackerA.id]: true,
			[trackerB.id]: true
		};

		const manager = new Manager([trackerA, trackerB]);
		manager.on('dirty', dirtyCallback);
		manager.on('update', updateCallback);
		manager.acceptAll();

		expect(manager.getAllConsents()).toEqual(expectedConsents);
		expect(dirtyCallback.mock.calls).toEqual([[false]]);
		expect(updateCallback.mock.calls).toEqual([[expectedConsents]]);
	});

	test('declineAll', () => {
		const trackerA = tracker();
		const trackerB = tracker();
		const dirtyCallback = jest.fn();
		const updateCallback = jest.fn();
		const expectedConsents = {
			[trackerA.id]: false,
			[trackerB.id]: false
		};

		const manager = new Manager([trackerA, trackerB]);
		manager.on('dirty', dirtyCallback);
		manager.on('update', updateCallback);
		manager.acceptAll();

		expect(manager.getAllConsents()).toEqual(expectedConsents);
		expect(dirtyCallback.mock.calls).toEqual([[false]]);
		expect(updateCallback.mock.calls).toEqual([[expectedConsents]]);
	});
});
