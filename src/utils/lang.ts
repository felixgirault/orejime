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
