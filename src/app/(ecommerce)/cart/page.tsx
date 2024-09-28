'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { CardProductContainer } from '@/components/card/CardProductContainer'
import { CardTitleWrapper } from '@/components/shared/CardTitleWrapper'
import { CartShoppingEmpty } from '@/components/shared/CartShoppingEmpty'
import { QuantityControl } from '@/components/shared/QuantityControl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useCartStore } from '@/context/useCartStore'
import { ProductApiProps } from '@/interfaces/products'
import { getProducts } from '@/services/getProducts'

export default function CartPage() {
	const [products, setProducts] = useState<ProductApiProps[]>([])

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
		}

		fetchProducts()
	}, [])

	return (
		<>
			<div className="contain text-sm">
				<Card className="border-none shadow-none">
					<CardHeader>
						<CardTitle className="text-lg font-bold text-blue-900">
							Mi carrito ({productsCart.length})
						</CardTitle>
					</CardHeader>

					{/* resumen de products */}

					{productsCart.length ? (
						<CardContent>
							<div className="flex flex-col lg:flex-row gap-8">
								<div className="lg:w-2/3 flex flex-col justify-center items-center gap-4">
									<Table>
										<TableHeader>
											<TableRow className="bg-gray-100">
												<TableHead className="text-blue-900">
													PRODUCTOS
												</TableHead>
												<TableHead className="text-blue-900">
													CANTIDAD
												</TableHead>
												<TableHead className="text-blue-900 text-right">
													SUB TOTAL
												</TableHead>
												<TableHead></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{productsCart.map((product) => (
												<TableRow key={product.id}>
													<TableCell>
														<div className="flex items-center space-x-4">
															<Image
																src={product.image}
																alt={product.name}
																className="w-12 h-12 object-cover"
																width={48}
																height={48}
															/>
															<div>
																<p className="capitalize font-medium text-blue-900">
																	{product.name}
																</p>
															</div>
														</div>
													</TableCell>
													<TableCell>
														<QuantityControl
															id={product.id}
															name={product.name}
															image={product.image}
															typeOffer={product?.typeOffer}
															price={product.price}
															isStock={true}
														/>
													</TableCell>
													<TableCell className="text-right">
														<div>
															<span className="text-gray-500">
																S/ {product?.subtotalItem?.toFixed(2)}
															</span>
														</div>
													</TableCell>
													<TableCell>
														<Button
															variant="ghost"
															size="sm"
															onClick={() => removeProduct(product.id)}
															className="text-blue-500 hover:text-blue-700"
														>
															Eliminar
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									<ButtonGeneral
										className="w-fit px-2"
										variant="ghost"
										href="/#lo-mas-buscado"
									>
										+ Agregar mas productos
									</ButtonGeneral>
								</div>
								<div className="lg:w-1/3">
									<Card className="bg-gray-50">
										<CardHeader>
											<CardTitle className="text-xl font-bold text-blue-900">
												Resumen de compra
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-2">
												<div className="flex justify-between">
													<span>Subtotal</span>
													<span>S/ {subtotal.toFixed(2)}</span>
												</div>
												<div className="flex justify-between">
													<span>Descuento</span>
													<span>- S/ {discount.toFixed(2)}</span>
												</div>
												{/* {shippingCost ? (
													<div className="flex justify-between">
														<span>Costo de envío</span>
														<span>S/ {shippingCost.toFixed(2)}</span>
													</div>
												): null} */}
												<div className="flex justify-between font-bold">
													<span>Total</span>
													<span>S/ {totalCart.toFixed(2)}</span>
												</div>
											</div>
											<ButtonGeneral href="/checkout">
												Ir a comprar
											</ButtonGeneral>
										</CardContent>
									</Card>
								</div>
							</div>
						</CardContent>
					) : (
						<div className="w-full flex justify-center">
							<CartShoppingEmpty typeComponent="checkout" />
						</div>
					)}
				</Card>
			</div>

			<CardTitleWrapper title="Lo más buscado" className="p-0">
				<CardProductContainer products={products} type="homeProduct" />
			</CardTitleWrapper>
		</>
	)
}
