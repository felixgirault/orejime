export default <T>(array: T[], key: keyof T) =>
	Object.fromEntries(array.map((obj) => [obj[key], obj]));
