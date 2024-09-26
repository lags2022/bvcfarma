'use client'

import { useFetchFavorites } from '@/hooks/useFetchFavorites'
import { ProductApiProps } from '@/interfaces/products'
import { TypeComponentCarousel } from '@/interfaces/type-component'
import { cn } from '@/lib/utils'
import { CarouselProvider } from '@/providers/CarouselProvider'

import { CardProduct } from './CardProduct'
import { CarouselItem } from '../ui/carousel'

export const CardProductContainer = ({
	products,
	type,
}: {
	products: ProductApiProps[]
	type: TypeComponentCarousel
}) => {
	useFetchFavorites()

	return (
		<div className="w-full space-y-10 px-4">
			<CarouselProvider type={type}>
				{products
					.map(({ id, image, name, typeOffer, price, stock }) => {
						const isStock = parseInt(stock) >= 1

						return (
							<CarouselItem
								key={id}
								className={cn(
									'w-full h-[400px]',
									type === 'homeProduct' &&
										'md:basis-1/2 lg:basis-1/3 xl:basis-1/4',
									type === 'homeOffer' && 'sm:basis-1/2 md:basis-1/3',
								)}
							>
								<CardProduct
									id={id}
									image={image}
									name={name}
									typeOffer={typeOffer}
									price={price}
									isStock={isStock}
								/>
							</CarouselItem>
						)
					})
					.slice(
						type === 'homeProduct' ? 0 : 6,
						type === 'homeProduct' ? 6 : 10,
					)}
			</CarouselProvider>
		</div>
	)
}
