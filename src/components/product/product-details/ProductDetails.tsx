'use client'

import { format } from '@formkit/tempo'
import {
	Star,
	Share2,
	Clock,
	Package,
	Beaker,
	FlaskConical,
} from 'lucide-react'

import { FavoriteButton } from '@/components/shared/FavoriteButton'
import { QuantityControl } from '@/components/shared/QuantityControl'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TYPEOFFER } from '@/constants/general'
import { useFetchFavorites } from '@/hooks/useFetchFavorites'
import { ProductPropsView } from '@/interfaces/products'

import { ProductDescription } from './ProductDescription'
import { ProductSavingsScale } from './ProductSavingsScale'

export const ProductDeilts = ({
	id,
	name,
	price,
	image,
	typeOffer,
	stock,
	linea,
	masterpack,
	description,
	expirationDate,
	subCategory,
	savingsScale,
}: ProductPropsView) => {
	const isStock = parseInt(stock) >= 1

	// quiero que el formato sea
	const expirationDateMod = format(new Date(expirationDate), 'MM-YYYY', 'es-PE')

	useFetchFavorites()

	return (
		<section className="text-sm mx-auto md:mx-0">
			{typeOffer && (
				<Badge className="capitalize bg-picker-3 text-white">
					{typeOffer} {TYPEOFFER[typeOffer]}
				</Badge>
			)}
			<h1 className="text-2xl font-bold capitalize">{name}</h1>
			<p className="text-xs -translate-y-1 text-gray-500">{linea}</p>
			{/* <div className="flex items-center mb-4">
				<div className="flex">
					{[...Array(5)].map((_, i) => (
						<Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
					))}
				</div>
				<span className="ml-2 text-sm text-gray-500">4.8 (2345 reseñas)</span>
			</div> */}

			<div className="flex flex-col lg:flex-row gap-4 xl:gap-6 mb-4">
				<div className="">
					<p className="text-xl font-bold mb-4">S./ {price}</p>
					<p className="my-1">
						{isStock ? 'Disponible en stock' : 'Sin stock'}
					</p>
					<div className="bg-white z-10 overflow-hidden md:bg-transparent fixed bottom-0 right-0 md:right-auto w-screen md:w-auto md:bottom-auto md:relative">
						<div className="flex justify-between md:justify-normal px-4 py-3 md:p-0 gap-4 mb-0 md:mb-6 mx-auto max-w-lg md:max-w-none">
							<QuantityControl
								id={id}
								name={name}
								image={image}
								typeOffer={typeOffer}
								price={price}
								isStock={isStock}
							/>
							<div className="order-first md:order-none">
								<FavoriteButton productId={id} />
							</div>
							<Button
								variant="outline"
								className="size-10 border-none hover:bg-white"
								size="icon"
							>
								<Share2 className="size-4" />
							</Button>
						</div>
					</div>
					<ProductSavingsScale savingsScale={savingsScale} />
				</div>

				<div className="text-xs max-w-full lg:max-w-52">
					<div className="space-y-4">
						<div className="flex items-center space-x-3">
							<FlaskConical className="size-5 text-gray-600" />

							<span className="uppercase pt-0.5">{subCategory}</span>
						</div>

						<div className="flex items-start space-x-3">
							<Clock className="size-5 text-gray-600" />
							<div>
								<p>Lote con vencimiento más próximo {expirationDateMod}</p>
								<p className="text-gray-600">
									Llegará un lote con vencimiento igual o mayor
								</p>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<Package className="size-5 text-gray-600" />
							<span>Masterpack x {masterpack} unidades</span>
						</div>
					</div>
				</div>
			</div>

			{/* descripcion del producto */}
			<ProductDescription description={description} />
		</section>
	)
}
