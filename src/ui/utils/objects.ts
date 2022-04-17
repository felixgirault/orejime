const isObject = (obj) => obj && typeof obj === 'object';

// @see https://stackoverflow.com/a/48218209/2391359
export const deepMerge = <T extends object>(...objects: T[]) => {
	return objects.reduce((prev, obj) => {
		Object.keys(obj).forEach((key) => {
			const pVal = prev[key];
			const oVal = obj[key];

			if (Array.isArray(pVal) && Array.isArray(oVal)) {
				prev[key] = pVal.concat(...oVal);
			} else if (isObject(pVal) && isObject(oVal)) {
				prev[key] = deepMerge(pVal, oVal);
			} else {
				prev[key] = oVal;
			}
		});

		return prev;
	}, {} as T);
};
