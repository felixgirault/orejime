import {TranslationObject, Translations} from '../types';

// temporary fix to avoid touching the code for now
declare global {
	interface Window {
		language: string;
	}

	interface String {
		format: (...args: any[]) => string[];
	}
}

String.prototype.format = function () {
	'use strict';
	var str = this.toString();

	var t = typeof arguments[0];
	var args;
	if (arguments.length == 0) args = {};
	else
		args =
			'string' === t || 'number' === t
				? Array.prototype.slice.call(arguments)
				: arguments[0];

	var splits = [];

	var s = str;
	while (s.length > 0) {
		var m = s.match(/\{(?!\{)([\w\d]+)\}(?!\})/);
		if (m !== null) {
			var left = s.substr(0, m.index);
			var sep = s.substr(m.index, m[0].length);
			s = s.substr(m.index + m[0].length);
			var n = parseInt(m[1]);
			splits.push(left);
			if (n != n) {
				// not a number
				splits.push(args[m[1]]);
			} else {
				// a numbered argument
				splits.push(args[n]);
			}
		} else {
			splits.push(s);
			s = '';
		}
	}
	return splits;
};

export function language() {
	return window.language || document.documentElement.lang || 'en';
}

function hget(d: Translations, key: string | string[], defaultValue?: string) {
	var kl = key;
	if (!Array.isArray(kl)) kl = [kl];
	var cv: Translations | string = d;
	for (var i = 0; i < kl.length; i++) {
		if (cv === undefined) return defaultValue;
		if (cv instanceof Map) cv = cv.get(kl[i]);
		else cv = (cv as TranslationObject)[kl[i]];
	}
	if (cv === undefined) return defaultValue;
	return cv;
}

export function t(
	trans: Translations,
	lang: string,
	debug: boolean,
	key: string | string[],
	...params: any[]
) {
	var kl = key;
	if (!Array.isArray(kl)) kl = [kl];
	const value = hget(trans, [lang, ...kl]);
	if (value === undefined) {
		if (debug) {
			console.log(
				'[missing translation: {lang}/{key}]'
					.format({key: kl.join('/'), lang: lang})
					.join('')
			);
		}
		return false;
	}
	if (params.length > 0) return (value as string).format(...params);
	return value;
}
