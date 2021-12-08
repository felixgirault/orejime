export default <T extends {[k: string | number]: any}>(obj1: T, obj2: T): T =>
	Object.entries(obj1).reduce(
		(diff, [key, value]) =>
			value === obj2?.[key] ? diff : {...diff, [key]: value},
		{} as T
	);
