import {getDeep} from '../../../src/ui/utils/objects';

describe('getDeep', () => {
	test('existing key', () => {
		expect(getDeep({foo: 'foo'}, ['foo'])).toEqual('foo');
		expect(getDeep({foo: {bar: 'bar'}}, ['foo', 'bar'])).toEqual('bar');
	});

	test('undefined key', () => {
		expect(getDeep({foo: 'foo'}, ['bar'])).toBeUndefined();
		expect(getDeep({foo: {bar: 'bar'}}, ['foo', 'foo'])).toBeUndefined();
	});
});
