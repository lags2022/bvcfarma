'use client'

import { useEffect } from 'react'

import { useFavoriteStore } from '@/context/useFavoriteStore'
import { pluralizeWord } from '@/helpers/plurize-word'
import { smoothScrollToTop } from '@/helpers/smooth-scroll-top'
import { ProductApiProps } from '@/interfaces/products'

import { BreadCrumbShared } from '../shared/BreadCrumbShared'
import { ProductsContainer } from '../shared/ProductsContainer'

export const Favorites = ({ products }: { products: ProductApiProps[] }) => {
	const favorites = useFavoriteStore((state) => state.favorites)

	const favoriteProducts = products.filter((product) =>
		favorites?.includes(product.id),
	)

	const breadcrumbItems = [
		{ href: '/favorites', label: 'Favoritos' },
		{
			label: pluralizeWord({
				quantity: favoriteProducts.length,
				singular: 'Resultado',
			}),
		},
	]

	useEffect(() => {
		const cancelScrollAnimation = smoothScrollToTop()

		return () => {
			cancelScrollAnimation()
		}
	}, [])

	return (
		<main className="py-4 md:py-6 space-y-4 md:space-y-6">
			<BreadCrumbShared breadcrumbItems={breadcrumbItems} />
			<ProductsContainer
				products={favoriteProducts}
				typeComponent="favorites"
			/>
		</main>
	)
}
