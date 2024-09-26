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
		<section className="text-sm">
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
			<div className="flex gap-8 mb-4">
				<div className="">
					<p className="text-xl font-bold mb-4">S./ {price}</p>
					<p className="my-1">
						{isStock ? 'Disponible en stock' : 'Sin stock'}
					</p>
					<div className="flex space-x-4 mb-6">
						<QuantityControl
							id={id}
							name={name}
							image={image}
							typeOffer={typeOffer}
							price={price}
							isStock={isStock}
						/>
						<FavoriteButton productId={id} />
						<Button
							variant="outline"
							className="size-10 border-none hover:bg-white"
							size="icon"
						>
							<Share2 className="size-4" />
						</Button>
					</div>
					<ProductSavingsScale savingsScale={savingsScale} />
				</div>
				<div className="text-xs max-w-md">
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
			<Tabs defaultValue="descripcion" className="">
				<TabsList className="bg-gray-200">
					<TabsTrigger value="descripcion">Descripción</TabsTrigger>
					<TabsTrigger value="especificaciones">Especificaciones</TabsTrigger>
					<TabsTrigger value="resenas">Reseñas</TabsTrigger>
					<TabsTrigger value="como-usar">Cómo usar</TabsTrigger>
				</TabsList>
				<TabsContent value="descripcion">
					<p>{description}</p>
				</TabsContent>
				<TabsContent value="especificaciones">
					<p>Especificaciones del producto...</p>
				</TabsContent>
				<TabsContent value="resenas">
					<p>Reseñas de los clientes...</p>
				</TabsContent>
				<TabsContent value="como-usar">
					<p>Instrucciones de uso...</p>
				</TabsContent>
			</Tabs>
		</section>
	)
}
