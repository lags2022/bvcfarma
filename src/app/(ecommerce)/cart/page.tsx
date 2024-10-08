'use client'

import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { CardProductContainer } from '@/components/card/CardProductContainer'
import { CartContent } from '@/components/cart/CartContent'
import { CardTitleWrapper } from '@/components/shared/CardTitleWrapper'
import { CartShoppingEmpty } from '@/components/shared/CartShoppingEmpty'
import { LoaderComponent } from '@/components/shared/Loader'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/context/useCartStore'
import { ProductApiProps } from '@/interfaces/products'
import { getProducts } from '@/services/getProducts'

export default function CartPage() {
	const [products, setProducts] = useState<ProductApiProps[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const { productsCart, subtotal, totalCart, discount, removeProduct } =
		useCartStore(
			useShallow((state) => ({
				productsCart: state.productsCart,
				subtotal: state.subtotal,
				totalCart: state.totalCart,
				discount: state.discount,
				removeProduct: state.removeProduct,
			})),
		)

	useEffect(() => {
		const fetchProducts = async () => {
			const products = await getProducts()

			setProducts(products)
			setIsLoading(false)
		}

		fetchProducts()
	}, [])

	return (
		<div className="contain py-4 md:py-6 space-y-4 md:space-y-6">
			<Card className="border-none shadow-none">
				<CardHeader>
					<CardTitle className="text-lg font-bold text-blue-900">
						Mi carrito ({productsCart.length})
					</CardTitle>
				</CardHeader>

				{/* resumen de products */}
				{isLoading ? (
					<LoaderComponent />
				) : productsCart.length ? (
					<CartContent
						productsCart={productsCart}
						subtotal={subtotal}
						totalCart={totalCart}
						discount={discount}
						removeProduct={removeProduct}
					/>
				) : (
					<div className="w-full flex justify-center">
						<CartShoppingEmpty typeComponent="checkout" />
					</div>
				)}
			</Card>

			<CardTitleWrapper title="Lo más buscado" className="p-0">
				{isLoading ? (
					<LoaderComponent />
				) : (
					<CardProductContainer products={products} type="homeProduct" />
				)}
			</CardTitleWrapper>
		</div>
	)
}
