import { create } from 'zustand'

import {
	CategoryApi,
	SubCategoryApi,
	SubSubCategoryApi,
	BrandsApi,
} from '@/interfaces/general'
import { ProductApiProps } from '@/interfaces/products'

interface FilterProduct {
	count?: number
	isSelected?: boolean
}

export type FilterTypes = 'tipos' | 'categories' | 'subCategories' | 'lines'

export interface FilterState {
	products: ProductApiProps[]
	tipos: (FilterProduct & CategoryApi)[]
	categories: (FilterProduct & SubCategoryApi)[]
	subCategories: (FilterProduct & SubSubCategoryApi)[]
	lines: (FilterProduct & BrandsApi)[]
	filteredProducts: ProductApiProps[]
	toogleFilter: (type: FilterTypes, id: number) => void
	setAll: (
		products: ProductApiProps[],
		tipos: CategoryApi[],
		categories: SubCategoryApi[],
		subCategories: SubSubCategoryApi[],
		lines: BrandsApi[],
		type?: FilterTypes,
		id?: number,
	) => void
	reCalculateFilter: () => void
	resetfilter: (value: 'partial' | 'all') => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
	products: [],
	filteredProducts: [],
	tipos: [],
	categories: [],
	subCategories: [],
	lines: [],
	setAll: (products, tipos, categories, subCategories, lines, type, id) => {
		const { tiposMod, categoriesMod, subCategoriesMod, linesMod } = setFilter(
			products,
			tipos,
			categories,
			subCategories,
			lines,
		)

		set({
			products,
			filteredProducts: products,
			tipos: tiposMod,
			categories: categoriesMod,
			subCategories: subCategoriesMod,
			lines: linesMod,
		})

		if (type && id) {
			get().toogleFilter(type, id)
		}
	},
	reCalculateFilter: () => {
		const { tipos, categories, subCategories, lines, products } = get()

		let filtered = filterBySelection(products, tipos, 'idCategory')
		filtered = filterBySelection(filtered, categories, 'idSubCategory')
		filtered = filterBySelection(filtered, subCategories, 'idSubSubCategory')
		filtered = filterBySelection(filtered, lines, 'idLinea')

		set({ filteredProducts: filtered })
	},
	toogleFilter: (type: FilterTypes, id: number) => {
		const stateMapping = {
			tipos: 'tipos',
			categories: 'categories',
			subCategories: 'subCategories',
			lines: 'lines',
		} as const
		const key = stateMapping[type]
		if (key) {
			set({
				[key]: get()[key].map((item) =>
					item.id === id ? { ...item, isSelected: !item.isSelected } : item,
				),
			})
			get().reCalculateFilter()
		}
	},
	resetfilter: (value) => {
		const { tipos, categories, subCategories, lines, products } = get()

		set({
			filteredProducts: value === 'all' ? products : [],
			tipos: tipos.map((item) => ({ ...item, isSelected: false })),
			categories: categories.map((item) => ({
				...item,
				isSelected: false,
			})),
			subCategories: subCategories.map((item) => ({
				...item,
				isSelected: false,
			})),
			lines: lines.map((item) => ({ ...item, isSelected: false })),
		})
	},
}))

// Función auxiliar para calcular los conteos
function setFilter(
	arrayProducts: ProductApiProps[],
	arrayTipos: CategoryApi[],
	arrayCategories: SubCategoryApi[],
	arraySubCategories: SubSubCategoryApi[],
	arrayLines: BrandsApi[],
) {
	// Inicializamos los conteos con una sola iteración sobre los productos
	const counts = arrayProducts.reduce(
		(acc, product) => {
			const tiposId = +product.idCategory
			const categoryId = +product.idSubCategory
			const subCategoryId = +product.idSubSubCategory
			const lineId = +product.idLinea

			// Incrementamos el conteo para cada filtro
			acc.tiposCount[tiposId] = (acc.tiposCount[tiposId] || 0) + 1
			acc.categoriesCount[categoryId] =
				(acc.categoriesCount[categoryId] || 0) + 1
			acc.subCategoriesCount[subCategoryId] =
				(acc.subCategoriesCount[subCategoryId] || 0) + 1
			acc.linesCount[lineId] = (acc.linesCount[lineId] || 0) + 1

			return acc
		},
		{
			tiposCount: {} as Record<number, number>,
			categoriesCount: {} as Record<number, number>,
			subCategoriesCount: {} as Record<number, number>,
			linesCount: {} as Record<number, number>,
		},
	)

	// Asignamos los conteos a los arrays de filtros
	const tiposMod = arrayTipos.map((tipo) => ({
		...tipo,
		count: counts.tiposCount[tipo.id] || 0,
	}))

	const categoriesMod = arrayCategories.map((category) => ({
		...category,
		count: counts.categoriesCount[category.id] || 0,
	}))

	const subCategoriesMod = arraySubCategories.map((subCategory) => ({
		...subCategory,
		count: counts.subCategoriesCount[subCategory.id] || 0,
	}))

	const linesMod = arrayLines.map((line) => ({
		...line,
		count: counts.linesCount[line.id] || 0,
	}))

	return {
		tiposMod,
		categoriesMod,
		subCategoriesMod,
		linesMod,
	}
}

function filterBySelection(
	products: ProductApiProps[],
	selectedItems: { id: number; isSelected?: boolean }[],
	key: keyof ProductApiProps,
) {
	if (selectedItems.some((item) => item.isSelected)) {
		return products.filter((product) =>
			selectedItems.find(
				(item) => item.isSelected && +product[key] === item.id,
			),
		)
	}
	return products
}
