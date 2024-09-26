export const capitalize = (name: string) => {
	if (!name) return ''
	return name.at(0)!.toUpperCase() + name.slice(1)
}
