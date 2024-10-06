'use client'

import { useFetchFavorites } from '@/hooks/useFetchFavorites'
import { ProductApiProps } from '@/interfaces/products'
import { TypeComponentPage } from '@/interfaces/type-component'

import { Loading } from './Loader'
import { CardProduct } from '../card/CardProduct'

export const ProductsContainer = ({
	products,
	typeComponent,
}: {
	products: ProductApiProps[]
	typeComponent?: TypeComponentPage
}) => {
	const isLoading = useFetchFavorites()

	if (isLoading) return <Loading />

	return (
		<div className="flex flex-wrap gap-6 contain">
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
