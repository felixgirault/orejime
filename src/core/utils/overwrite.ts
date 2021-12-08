export default <T>(
	defaults: {[key: string]: T},
	values: {[key: string]: T}
): {[key: string]: T} =>
	Object.keys(defaults).reduce(
		(c, key) => ({
			...c,
			[key]: values[key] ?? defaults[key]
		}),
		{}
	);
