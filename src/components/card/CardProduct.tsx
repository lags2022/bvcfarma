'use client'

import { Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { TYPEOFFER } from '@/constants/general'
import { CardProductProps } from '@/interfaces/products'

import { FavoriteButton } from '../shared/FavoriteButton'
import { QuantityControl } from '../shared/QuantityControl'

export const CardProduct = ({
	id,
	image,
	name,
	typeOffer,
	price,
	isStock,
}: CardProductProps) => {
	return (
		<Card className="w-full mx-auto max-w-64 shadow-md">
			<CardContent className="p-4 flex flex-col space-y-4 relative">
				<Link href={`/products/${id}`} className="group/card">
					<div className="w-full flex justify-center relative">
						<Image
							src={image}
							width={200}
							height={200}
							alt={name}
							className="rounded-md aspect-square object-contain group-hover/card:scale-105 transition-all duration-300 ease-in-out"
						/>
						<div className="w-full absolute top-0 left-0">
							{typeOffer && (
								<Badge className=" bg-picker-3 text-white">
									{TYPEOFFER[typeOffer]}
								</Badge>
							)}
						</div>
					</div>
					<div className="space-y-2">
						<p className="text-[0.6rem] h-3 font-semibold text-muted-foreground uppercase">
							{typeOffer}
						</p>
						<h3 className="font-bold leading-tight text-sm !mt-0 capitalize">
							{name}
						</h3>
						<div className="flex justify-between items-center">
							<div className="bg-gray-200 w-fit px-2 py-1 rounded-full flex items-center space-x-2 -translate-x-0.5">
								<span className="text-xs font-semibold text-muted-foreground">
									Bvcfarma
								</span>
							</div>

							<TooltipProvider delayDuration={100}>
								<Tooltip>
									<TooltipTrigger asChild>
										<div className="inline-flex">
											<Truck className="h-5 w-5 text-muted-foreground cursor-pointer" />
										</div>
									</TooltipTrigger>
									<TooltipContent className="z-10" sideOffset={5}>
										<p>Despacho a domicilio</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="relative flex items-center !mt-3 space-x-2">
							<span className="text-base font-bold">S/ {price}</span>
							<span className="text-sm text-muted-foreground line-through">
								S/ {(parseInt(price) * 0.8).toFixed(2)}
							</span>
						</div>
					</div>
				</Link>
				<FavoriteButton productId={id} className="absolute -top-2 right-2" />
				<QuantityControl
					id={id}
					image={image}
					name={name}
					typeOffer={typeOffer}
					price={price}
					isStock={isStock}
				/>
			</CardContent>
		</Card>
	)
}
