export default <T>(array: T[], unwanted: T[]) =>
	array.filter((value) => !unwanted.includes(value));
