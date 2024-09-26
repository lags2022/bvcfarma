'use client'

import { useShallow } from 'zustand/react/shallow'

import { useFilterStore } from '@/context/useFilterStore'

import { FilterSection } from './FilterSection'
import { Accordion } from '../ui/accordion'

export function Filter() {
	const { tipos, categories, subCategories, lines, toogleFilter, resetfilter } =
		useFilterStore(
			useShallow((state) => ({
				tipos: state.tipos,
				categories: state.categories,
				subCategories: state.subCategories,
				lines: state.lines,
				toogleFilter: state.toogleFilter,
				resetfilter: state.resetfilter,
			})),
		)

	const filteredCategories = categories.filter((item) =>
		tipos.some((tipo) => tipo.isSelected && +item.idCategory === tipo.id),
	)

	const filteredSubCategories = subCategories.filter((item) => {
		if (filteredCategories.some((category) => category.isSelected)) {
			return filteredCategories.some(
				(category) =>
					category.isSelected && +item.idSubCategory === category.id,
			)
		}

		if (categories.some((category) => category.isSelected)) {
			return categories.some(
				(category) =>
					category.isSelected && +item.idSubCategory === category.id,
			)
		}
		// if (item.isSelected) {
		//   console.log("fffffff3")
		// 	return true
		// }
		// console.log("fffffff4")

		return filteredCategories.some(
			(category) => +item.idSubCategory === category.id,
		)
	})

	return (
		<div className="w-64 border rounded-md shadow-sm bg-white">
			<p
				onClick={() => {
					resetfilter('all')
				}}
				className="w-full text-end px-4 text-xs py-2 font-semibold capitalize text-picker-3 hover:cursor-pointer hover:text-picker-4 hover:underline"
			>
				Limpiar filtros
			</p>
			<Accordion
				type="multiple"
				defaultValue={['categories', 'lines', 'subCategories', 'tipos']}
				className="w-full"
			>
				{/* <FilterSection
					title="Tipos"
					items={tipos}
					toogleFilter={toogleFilter}
					value="tipos"
				/> */}
				<FilterSection
					title="Categorías"
					items={filteredCategories.length ? filteredCategories : categories}
					toogleFilter={toogleFilter}
					value="categories"
				/>
				<FilterSection
					title="SubCategorías"
					items={
						filteredSubCategories.length ? filteredSubCategories : subCategories
					}
					toogleFilter={toogleFilter}
					value="subCategories"
				/>
				<FilterSection
					title="Líneas"
					items={lines}
					toogleFilter={toogleFilter}
					value="lines"
				/>
			</Accordion>
		</div>
	)
}
