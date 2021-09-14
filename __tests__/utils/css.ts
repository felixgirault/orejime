import {createCssNamespace} from '../../src/utils/css';

describe('createCssNamespace', () => {
	test('one', () => {
		expect(createCssNamespace('ns')('foo')).toEqual('ns-foo');
	});

	test('many', () => {
		expect(createCssNamespace('ns')('foo bar')).toEqual('ns-foo ns-bar');
	});
});
