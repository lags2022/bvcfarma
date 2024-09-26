'use client'

import { useFavoriteStore } from '@/context/useFavoriteStore'
import { pluralizeWord } from '@/helpers/plurize-word'
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

	return (
		<main className="py-10">
			<BreadCrumbShared breadcrumbItems={breadcrumbItems} />
			<ProductsContainer products={favoriteProducts} />
		</main>
	)
}
