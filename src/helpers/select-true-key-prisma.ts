export function selectTrueKeys<T>(keys: (keyof T)[]): Record<keyof T, boolean> {
	const objectKeys = keys.reduce(
		(acc, key) => {
			acc[key] = true
			return acc
		},
		{} as Record<keyof T, boolean>,
	)

	return objectKeys
}
