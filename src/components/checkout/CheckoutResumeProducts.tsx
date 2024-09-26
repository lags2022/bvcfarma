'use client'

import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { ProductsContainerCartOrCheckout } from '../shared/products-cart-checkout/ProductsContainerCartOrCheckout'

export const CheckoutResumeProducts = () => {
	return (
		<Card className="w-full h-min">
			<CardHeader className="flex flex-row justify-between">
				<CardTitle className="text-base w-fit">Resumen de pedido</CardTitle>
				<Link
					className="hover:underline hover:cursor-pointer text-picker-4 font-medium"
					href={'/cart'}
				>
					Editar carrito
				</Link>
			</CardHeader>

			<CardContent className="space-y-4">
				<ProductsContainerCartOrCheckout typeComponentShopping="checkout" />
			</CardContent>
		</Card>
	)
}
