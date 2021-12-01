export function escapeRegex(regex: string) {
	return regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

export function deprecate(name: string, replacement?: string) {
	/*
	console.warn(
		`Orejime: ${name} is deprecated and will be removed in future versions. ${replacement ? `Please use ${replacement} instead.` : ''}`
	);
	*/
}

export const uniq = <T>(array: T[]) =>
	Array.from(new Set(array));

export const diff = <T extends {[k: string|number]: any}>(obj1: T, obj2: T): T =>
	Object.entries(obj1).reduce((diff, [key, value]) =>
		value === obj2?.[key]
			? diff
			: {...diff, [key]: value}
	, {} as T);
