import Image from 'next/image'

import { CartShoppingProduct } from '@/context/useCartStore'

import { ButtonGeneral } from '../button/ButtonGeneral'
import { QuantityControl } from '../shared/QuantityControl'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
// import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'

export const CartContent = ({
	productsCart,
	subtotal,
	totalCart,
	discount,
	removeProduct,
}: {
	productsCart: CartShoppingProduct[]
	subtotal: number
	totalCart: number
	discount: number
	removeProduct: (productId: number) => void
}) => {
	return (
		<CardContent>
			<div className="flex flex-col lg:flex-row gap-6">
				<div className="lg:w-2/3 flex flex-col justify-center items-center gap-4 [&>div]:table-order-scrollbar">
					{/* <ScrollArea className="w-full [&>div]:table-order-scrollbar"> */}
						<Table className="w-[650px] md:w-full">
							<TableHeader>
								<TableRow className="bg-gray-100">
									<TableHead className="text-blue-900 w-48 md:w-56 lg:w-48 xl:w-56">
										PRODUCTOS
									</TableHead>
									<TableHead className="text-blue-900 w-64 md:w-auto">
										CANTIDAD
									</TableHead>
									<TableHead className="text-blue-900 text-right w-28 md:w-36 lg:w-28 xl:w-36">
										SUB TOTAL
									</TableHead>
									<TableHead className="w-20 md:w-28 lg:w-20 xl:w-28"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{productsCart.map((product) => (
									<TableRow key={product.id}>
										<TableCell>
											<div className="flex items-center gap-2">
												<Image
													src={product.image}
													alt={product.name}
													width={48}
													height={48}
													className="w-12 h-12 aspect-square object-contain"
												/>
												<div>
													<p className="capitalize font-medium text-blue-900 truncate w-32">
														{product.name}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell className="w-64 md:w-auto">
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
						{/* <ScrollBar orientation="horizontal"/>
					</ScrollArea> */}
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
						<CardContent className="flex flex-col gap-4">
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
							<ButtonGeneral href="/checkout">Ir a comprar</ButtonGeneral>
						</CardContent>
					</Card>
				</div>
			</div>
		</CardContent>
	)
}
