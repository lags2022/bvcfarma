'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { Filter } from '@/components/filter/Filter'
import { BreadCrumbShared } from '@/components/shared/BreadCrumbShared'
import { ProductsContainer } from '@/components/shared/ProductsContainer'
import { useFilterStore } from '@/context/useFilterStore'
import {
	getAllSearchParamsAll,
	getFirstSearchParam,
} from '@/helpers/getSearchParams'
import {
  getApiData,
} from '@/services/getProducts'

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
      const { products, tipos, categories, subCategories, lines } = await getApiData()

			setAll(
				products,
				tipos,
				categories,
				subCategories,
				lines,
				params?.key,
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
		<main>
			<BreadCrumbShared breadcrumbItems={breadcrumbItems} />
			<h1 className="text-lg font-bold capitalize">{name || 'Productos'}</h1>
			<section className="grid grid-cols-5 max-w-7xl mx-auto px-4 gap-6">
				<div className="col-span-1">
					<Filter />
				</div>
				<div className="col-span-4">
					<ProductsContainer products={filteredProducts} />
				</div>
			</section>
		</main>
	)
}
