import { ReadonlyURLSearchParams } from 'next/navigation'

export const getFirstSearchParam = (searchParams: ReadonlyURLSearchParams) => {
	const params = searchParams.entries()
	const firstParam = params.next().value
	return firstParam ? { key: firstParam[0], value: firstParam[1] } : null
}

export const getAllSearchParamsAll = (
	searchParams: ReadonlyURLSearchParams,
) => {
	const tipos = searchParams.get('tipos')
	const categories = searchParams.get('categories')
	const subCategories = searchParams.get('subCategories')

	// Inicializamos un objeto para almacenar los parámetros
	const paramsObj: Record<string, string> = {}

	if (tipos) {
		paramsObj['tipos'] = tipos
	}

	if (categories) {
		paramsObj['categories'] = categories
	}

	if (subCategories) {
		paramsObj['subCategories'] = subCategories
	}

	// Retornamos el objeto con todos los parámetros
	return paramsObj
}
