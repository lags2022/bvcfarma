'use client'

import { useFetchFavorites } from '@/hooks/useFetchFavorites'
import { ProductApiProps } from '@/interfaces/products'
import { TypeComponentPage } from '@/interfaces/type-component'

import { LoaderComponent } from './Loader'
import { ButtonGeneral } from '../button/ButtonGeneral'
import { CardProduct } from '../card/CardProduct'

export const ProductsContainer = ({
	products,
	typeComponent,
}: {
	products: ProductApiProps[]
	typeComponent?: TypeComponentPage
}) => {
	const isLoading = useFetchFavorites()

	if (isLoading) return <LoaderComponent />

	if (!products.length && typeComponent === 'favorites')
		return (
			<div className="contain m-auto flex flex-col justify-center items-center gap-6 py-6">
				<div>No tienes favoritos.</div>

				<ButtonGeneral href="/" className="!bg-transparent">
					Ir a la página de inicio
				</ButtonGeneral>
			</div>
		)

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
