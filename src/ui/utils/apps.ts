import type {Tracker} from '../types';
import {uniq} from './lang';

export const getPurposes = (apps: Tracker[]) =>
	uniq(
		apps.reduce(
			(all, {purposes}) => all.concat(purposes || []),
			[] as string[]
		)
	);
