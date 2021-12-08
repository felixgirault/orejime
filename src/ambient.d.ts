declare module 'assign-deep' {
	const assign: <T extends object>(...objects: T[]) => T
	export default assign;
}

declare module '*.yml' {
	const data: object;
	export default data;
}
