import {
	ICON_MULTILEVEL_NAVBAR_CATEGORIA,
	MOCKUP_MULTILEVEL_NAVBAR_TIPOS,
} from '@/constants/navbar'
import {
	CategoryApi,
	SubCategoryApi,
	SubSubCategoryApi,
} from '@/interfaces/general'
import { MultiLevel } from '@/interfaces/navbar'

export const multilevelNavbar = ({
	tipos,
	categories,
	subCategories,
}: {
	tipos: CategoryApi[]
	categories: SubCategoryApi[]
	subCategories: SubSubCategoryApi[]
}): MultiLevel[] => {
	return [...tipos,...MOCKUP_MULTILEVEL_NAVBAR_TIPOS].map((item) => ({
		// const MULTILEVEL_NAVBAR: MultiLevel[] = categories.map((item) => ({
		id: item.id,
		type: 'tipos',
		name: item.name,
		icon: item.icon,
		color: ICON_MULTILEVEL_NAVBAR_CATEGORIA[item.name].color,
		items: categories
			.filter((subItem) => parseInt(subItem.idCategory) === item.id)
			.map((subItem) => ({
				id: subItem.id,
				idCategory: subItem.idCategory,
				type: 'categories',
				name: subItem.name,
				items: subCategories
					.filter(
						(subSubItem) => parseInt(subSubItem.idSubCategory) === subItem.id,
					)
					.map((subSubItem) => ({
						id: subSubItem.id,
						idCategory: subItem.idCategory,
						idSubCategory: subSubItem.idSubCategory,
						type: 'subCategories',
						name: subSubItem.name,
					})),
			})),
	}))
}
