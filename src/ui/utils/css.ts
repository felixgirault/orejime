import {CssNamespace} from '../types';

export const createCssNamespace =
	(namespace: string): CssNamespace =>
	(className: string) =>
		`${namespace}-${className}`;
