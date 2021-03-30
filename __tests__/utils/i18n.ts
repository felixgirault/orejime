import {Translations} from '../../src/types';
import {t} from '../../src/utils/i18n';

describe('t', () => {
	let translations: Translations = {};

	beforeEach(() => {
		translations = {
			en: {
				foo: {
					bar: 'foobar',
					baz: 'foo {var} baz'
				}
			}
		};
	});

	test('existing key', () => {
		expect(t(translations, 'en', false, ['foo', 'bar'])).toEqual('foobar');
	});

	test('undefined key', () => {
		expect(t(translations, 'en', false, ['baz'])).toEqual(false);
	});

	test('undefined lang', () => {
		expect(t(translations, 'fr', false, ['foo', 'bar'])).toEqual(false);
	});

	test('no vars', () => {
		expect(t(translations, 'en', false, ['foo', 'baz'])).toEqual(
			'foo {var} baz'
		);
	});

	test('vars', () => {
		expect(
			t(translations, 'en', false, ['foo', 'baz'], {var: 'bar'})
		).toEqual(['foo ', 'bar', ' baz']);
	});
});
