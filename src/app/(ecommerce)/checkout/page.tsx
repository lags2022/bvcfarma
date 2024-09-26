'use client'

import { CheckoutPersonData } from '@/components/checkout/checkout-persona-data/CheckoutPersonData'
import { CheckoutFinish } from '@/components/checkout/CheckoutFinish'
import { CheckoutResumeProducts } from '@/components/checkout/CheckoutResumeProducts'
import { CartShoppingEmpty } from '@/components/shared/CartShoppingEmpty'
import { useCartStore } from '@/context/useCartStore'

export default function Checkout() {
	const productsCart = useCartStore((state) => state.productsCart)

	return (
		<main className="container mx-auto p-4 text-sm">
			<h1 className="font-bold text-base mb-4">
				{productsCart.length === 0
					? 'No hay productos en tu carrito'
					: '¡Ya falta poco para finalizar tu compra!'}
			</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
				{/* datos personales */}
				{productsCart.length === 0 ? (
					<div className="col-span-2 mx-auto">
						<CartShoppingEmpty typeComponent="checkout" />
					</div>
				) : (
					<CheckoutPersonData />
				)}

				{/* resumen de products */}
				<CheckoutResumeProducts />

				{/* finalizar compra */}
				{productsCart.length !== 0 && <CheckoutFinish />}
			</div>
		</main>
	)
}
