'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Filter } from '@/components/filter/Filter'
import { BreadCrumbShared } from '@/components/shared/BreadCrumbShared'
import { ProductsContainer } from '@/components/shared/ProductsContainer'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { FilterTypes, useFilterStore } from '@/context/useFilterStore'
import {
	getAllSearchParamsAll,
	getFirstSearchParam,
} from '@/helpers/getSearchParams'
import { getApiData } from '@/services/getProducts'

export default function PageProducts() {
	const { filteredProducts, setAll, toogleFilter, tipos, resetfilter } =
		useFilterStore(
			useShallow((state) => ({
				filteredProducts: state.filteredProducts,
				setAll: state.setAll,
				toogleFilter: state.toogleFilter,
				tipos: state.tipos,
				resetfilter: state.resetfilter,
			})),
		)
	const breadcrumbItems = [{ href: '/products', label: 'Products' }]

	// Obtiene los parámetros de búsqueda
	const searchParams = useSearchParams()

	const params = getFirstSearchParam(searchParams)

	const paramsAll = getAllSearchParamsAll(searchParams)

	// const router = useRouter()

	const name = tipos.find((item) => item.id === Number(params?.value))?.name

	// const clearParams = () => {
	// 	// Actualiza la URL sin parámetros de búsqueda
	// 	setTimeout(() => {
	// 		router.replace('/products')
	// 	}, 1000)
	// }

	useEffect(() => {
		const fetchAll = async () => {
			const { products, tipos, categories, subCategories, lines } =
				await getApiData()

			setAll(
				products,
				tipos,
				categories,
				subCategories,
				lines,
				(params?.key as FilterTypes) ?? '',
				Number(params?.value),
			)
		}

		fetchAll()
	}, [])

	// useEffect(() => {
	// 	if (params?.key && params?.value) {
	// 		resetfilter('partial')
	// 		toogleFilter(params?.key, Number(params?.value))
	// 		// clearParams()
	// 	}
	// }, [params?.key, params?.value])

	useEffect(() => {
		if (paramsAll['tipos']) {
			resetfilter('partial')
			toogleFilter('tipos', Number(paramsAll['tipos']))

			if (paramsAll['categories']) {
				toogleFilter('categories', Number(paramsAll['categories']))

				if (paramsAll['subCategories']) {
					toogleFilter('subCategories', Number(paramsAll['subCategories']))
				}
			}

			// clearParams()
		}
	}, [paramsAll['tipos'], paramsAll['categories'], paramsAll['subCategories']])

	return (
		<main className="contain py-4 md:py-6 space-y-4 md:space-y-6">
			<BreadCrumbShared breadcrumbItems={breadcrumbItems} />
			<h1 className="text-center text-lg font-bold capitalize">
				{name || 'Productos'}
			</h1>
			<section className="contain flex flex-col sm:flex-row">
				<div className="hidden sm:block max-w-64">
					<Filter />
				</div>
				<Drawer>
					<DrawerTrigger
						className="mb-4 block rounded-lg sm:hidden p-3 bg-picker-3 text-white hover:bg-picker-4"
						aria-label="Toggle Menu"
					>
						Filtrar por
					</DrawerTrigger>
					<DrawerContent className="max-h-[500px]">
						<DrawerHeader className="text-center">
							<DrawerTitle>Filtrar por</DrawerTitle>
							<DrawerDescription>
								Selecciona un tipo de producto para filtrar
							</DrawerDescription>
						</DrawerHeader>
						<Filter isMovil />
						<DrawerFooter className="pt-4">
							<DrawerClose asChild>
								<ButtonGeneral variant="outline">Close</ButtonGeneral>
							</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
				<div className="mx-auto">
					<ProductsContainer products={filteredProducts} />
				</div>
			</section>
		</main>
	)
}
