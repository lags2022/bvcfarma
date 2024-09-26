'use client'

import { useFetchFavorites } from '@/hooks/useFetchFavorites'
import { ProductApiProps } from '@/interfaces/products'

import { Loading } from './Loader'
import { CardProduct } from '../card/CardProduct'

export const ProductsContainer = ({
	products,
}: {
	products: ProductApiProps[]
}) => {
	const isLoading = useFetchFavorites()

	if (isLoading) return <Loading />

	return (
		<div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-6xl *:max-w-none px-4">
			{products.map(({ id, image, name, typeOffer, price, stock }) => {
				const isStock = parseInt(stock) >= 1

				return (
					<CardProduct
						key={id}
						id={id}
						image={image}
						name={name}
						typeOffer={typeOffer}
						price={price}
						isStock={isStock}
					/>
				)
			})}
		</div>
	)
}
