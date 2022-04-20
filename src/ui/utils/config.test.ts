import type {Purpose, PurposeList} from '../types';
import {purposesOnly} from './config';

test('purposesOnly', () => {
	const a: Purpose = {
		id: 'a',
		title: 'a',
		cookies: []
	};

	const b: Purpose = {
		id: 'b',
		title: 'b',
		cookies: []
	};

	const purposes: PurposeList = [
		{
			id: 'c',
			title: 'c',
			purposes: [a]
		},
		b
	];

	expect(purposesOnly(purposes)).toEqual([a, b]);
});
