import ConsentManager from '../src/ConsentManager';
import {defaultConfig} from '../src/orejime';
import {App} from '../src/types';

describe('ConsentManager', () => {
	const createApp = (props: Partial<App> = {}): App => {
		// https://stackoverflow.com/a/28997977
		const randomName = (Math.random()*1e20).toString(36);

		return {
			name: randomName,
			title: randomName,
			description: randomName,
			cookies: [],
			...props
		}
	};

	test('cookieName', () => {
		console.log(defaultConfig)
		const m1 = new ConsentManager(defaultConfig);

		expect(m1.cookieName).toEqual('orejime');

		const m2 = new ConsentManager({
			...defaultConfig,
			cookieName: 'foo'
		});

		expect(m2.cookieName).toEqual('foo');
	});

	test('watch/unwatch/notify', () => {
		const m1 = new ConsentManager(defaultConfig);
		const consents = {
			foo: true
		};

		const watcher = {
			update: jest.fn((emitter, name, consents) => {})
		};

		m1.watch(watcher);
		m1.notify('foo', consents);
		m1.unwatch(watcher);
		m1.notify('bar', consents);

		expect(watcher.update.mock.calls).toEqual([[m1, 'foo', consents]]);
	});

	test('getApp', () => {
		const app = createApp();
		const m = new ConsentManager({
			...defaultConfig,
			apps: [app]
		});

		expect(m.getApp(app.name)).toEqual(app);
		expect(m.getApp('foo')).toBeUndefined();
	});

	test('areAllAppsRequired', () => {
		const m1 = new ConsentManager({
			...defaultConfig,
			apps: [createApp({required: true})]
		});

		expect(m1.areAllAppsRequired()).toBeTruthy();

		const m2 = new ConsentManager({
			...defaultConfig,
			apps: [
				createApp(),
				createApp({required: true}),
			]
		});

		expect(m2.areAllAppsRequired()).toBeFalsy();
	});

	test('areAllAppsEnabled', () => {
		const app1 = createApp({default: false});
		const app2 = createApp({default: false});
		const m = new ConsentManager({
			...defaultConfig,
			apps: [app1, app2]
		});

		expect(m.areAllAppsEnabled()).toBeFalsy();

		m.updateConsent(app1, true);
		expect(m.areAllAppsEnabled()).toBeFalsy();

		m.updateConsent(app2, true);
		expect(m.areAllAppsEnabled()).toBeTruthy();
	});

	test('areAllAppsDisabled', () => {
		const app1 = createApp({default: false});
		const app2 = createApp({default: false});
		const m = new ConsentManager({
			...defaultConfig,
			apps: [app1, app2]
		});

		expect(m.areAllAppsDisabled()).toBeTruthy();

		m.updateConsent(app1, true);
		expect(m.areAllAppsDisabled()).toBeFalsy();
	});

	test('getDefaultConsent', () => {
		const app = createApp();
		const m1 = new ConsentManager({
			...defaultConfig,
			default: false
		});

		expect(
			m1.getDefaultConsent({
				...app,
				default: true
			})
		).toEqual(true);

		const m2 = new ConsentManager({
			...defaultConfig,
			default: true
		});

		expect(m2.getDefaultConsent(app)).toEqual(true);

		const m3 = new ConsentManager({
			...defaultConfig,
			default: false
		});

		expect(m3.getDefaultConsent(app)).toEqual(false);
	});

	test('defaultConsents', () => {
		const app = createApp();
		const m1 = new ConsentManager({
			...defaultConfig,
			default: false,
			apps: [app]
		});

		expect(m1.defaultConsents).toEqual({
			[app.name]: m1.getDefaultConsent(app)
		});

		const m2 = new ConsentManager({
			...defaultConfig,
			default: true,
			apps: [app]
		});

		expect(m2.defaultConsents).toEqual({
			[app.name]: m2.getDefaultConsent(app)
		});
	});

	test('declineAll', () => {});

	test('acceptAll', () => {});

	test('updateConsent', () => {
		const m1 = new ConsentManager(defaultConfig);
		const watcher1 = {
			update: jest.fn((emitter, name, consents) => {})
		};

		m1.watch(watcher1);
		m1.updateConsent(createApp({required: true}), false);

		expect(watcher1.update.mock.calls).toEqual([]);

		const app = createApp();
		const m2 = new ConsentManager(defaultConfig);
		const watcher2 = {
			update: jest.fn((emitter, name, consents) => {})
		};

		m2.watch(watcher2);
		m2.updateConsent(app, true);
		m2.updateConsent(app, false);

		expect(watcher2.update.mock.calls).toEqual([
			[m2, 'consents', {[app.name]: true}],
			[m2, 'consents', {[app.name]: false}]
		]);
	});

	test('reupdateConsent', () => {});

	test('getConsent', () => {});

	test('_checkConsents', () => {});

	test('loadConsents', () => {});

	test('saveAndApplyConsents', () => {});

	test('saveConsents', () => {});

	test('applyConsents', () => {});

	test('updateAppElements', () => {});

	test('updateAppCookies', () => {});
});
