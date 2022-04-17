// Same behavior as `[].every()`, but returns false when the array is empty.
export const every = <T>(array: T[], predicate: (element: T) => boolean) =>
	array.length ? array.every(predicate) : false;
