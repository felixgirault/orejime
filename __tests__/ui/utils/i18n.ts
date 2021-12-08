import {Translations} from '../../../src/ui/types';
import {t} from '../../../src/ui/utils/i18n';

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
		expect(t(translations, 'en', false, ['baz'])).toEqual('');
	});

	test('undefined lang', () => {
		expect(t(translations, 'fr', false, ['foo', 'bar'])).toEqual('');
	});
});
