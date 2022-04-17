import Manager from '../../src/core/Manager';
import Purpose from '../../src/core/Purpose';

describe('Consents', () => {
	const tracker = (props: Partial<Purpose> = {}): Purpose => {
		// https://stackoverflow.com/a/28997977
		const id = (Math.random() * 1e20).toString(36);

		return {
			id,
			cookies: [],
			...props
		};
	};

	test('areAllPurposesMandatory', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllPurposesMandatory()).toBeFalsy();

		const managerB = new Manager([tracker(), tracker({isMandatory: true})]);

		expect(managerB.areAllPurposesMandatory()).toBeFalsy();

		const managerC = new Manager([tracker({isMandatory: true})]);

		expect(managerC.areAllPurposesMandatory()).toBeTruthy();
	});

	test('areAllPurposesEnabled', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllPurposesEnabled()).toBeFalsy();

		const managerB = new Manager([tracker(), tracker({default: true})]);

		expect(managerB.areAllPurposesEnabled()).toBeFalsy();

		const managerC = new Manager([tracker({default: true})]);

		expect(managerC.areAllPurposesEnabled()).toBeTruthy();
	});

	test('areAllPurposesDisabled', () => {
		const managerA = new Manager([]);

		expect(managerA.areAllPurposesDisabled()).toBeFalsy();

		const managerB = new Manager([tracker(), tracker({default: true})]);

		expect(managerB.areAllPurposesDisabled()).toBeFalsy();

		const managerC = new Manager([tracker()]);

		expect(managerC.areAllPurposesDisabled()).toBeTruthy();
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
		const trackerB = tracker({
			default: true
		});

		const dirtyCallback = jest.fn();
		const updateCallback = jest.fn();
		const expectedConsents = {
			[trackerA.id]: true,
			[trackerB.id]: true
		};

		const expectedDiff = {
			[trackerA.id]: true
		};

		const manager = new Manager([trackerA, trackerB]);
		manager.on('dirty', dirtyCallback);
		manager.on('update', updateCallback);
		manager.acceptAll();

		expect(manager.getAllConsents()).toEqual(expectedConsents);
		expect(dirtyCallback.mock.calls).toEqual([[false]]);
		expect(updateCallback.mock.calls).toEqual([
			[expectedDiff, expectedConsents]
		]);
	});

	test('declineAll', () => {
		const trackerA = tracker({
			default: true
		});

		const trackerB = tracker({
			isMandatory: true
		});

		const dirtyCallback = jest.fn();
		const updateCallback = jest.fn();
		const expectedConsents = {
			[trackerA.id]: false,
			[trackerB.id]: true
		};

		const expectedDiff = {
			[trackerA.id]: false
		};

		const manager = new Manager([trackerA, trackerB]);
		manager.on('dirty', dirtyCallback);
		manager.on('update', updateCallback);
		manager.declineAll();

		expect(manager.getAllConsents()).toEqual(expectedConsents);
		expect(dirtyCallback.mock.calls).toEqual([[false]]);
		expect(updateCallback.mock.calls).toEqual([
			[expectedDiff, expectedConsents]
		]);
	});
});
