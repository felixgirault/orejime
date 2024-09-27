import {Translations} from '../../src/types';
import {t} from '../../src/utils/i18n';

describe('t', () => {
	let translations: Translations = {};

	beforeEach(() => {
		translations = {
			en: {
				foo: {
					bar: 'foobar'
				}
			}
		};
	});

	test('existing key', () => {
		expect(t(translations, 'en', false, ['foo', 'bar'])).toEqual('foobar');
	});

	test('undefined key', () => {
		expect(t(translations, 'en', false, ['baz'])).toBeUndefined();
	});

	test('undefined lang', () => {
		expect(t(translations, 'fr', false, ['foo', 'bar'])).toBeUndefined();
	});
});
