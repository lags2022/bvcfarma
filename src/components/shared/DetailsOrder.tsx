import Link from 'next/link'

import { CartShoppingProduct } from '@/context/useCartStore'
import { TypeComponentShopping } from '@/interfaces/type-component'
import { cn } from '@/lib/utils'

import { ProductCartOrCheckout } from './products-cart-checkout/ProductCartOrCheckout'
import { ButtonGeneral } from '../button/ButtonGeneral'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'

interface DetailsOrderProps {
	productsCart: CartShoppingProduct[]
	subtotal: number
	totalCart: number
	discount: number
	shippingCost: number
	totalCheckout: number
	typeComponentShopping: TypeComponentShopping
	setShowCart?: () => void
}

export const DetailsOrder = ({
	productsCart,
	subtotal,
	totalCart,
	discount,
	shippingCost,
	totalCheckout,
	typeComponentShopping,
	setShowCart,
}: DetailsOrderProps) => {

	return (
		<div
			className={cn(
				'w-full text-sm flex flex-col justify-between',
				typeComponentShopping === 'cart' && 'h-full py-3',
			)}
		>
			{/* products cart shopping here */}
			<ScrollArea
				className={cn(
					'w-full ',
					typeComponentShopping === 'cart' && ' pr-6',
					// typeComponent === 'checkout' && 'bg-gray-50 p-2 rounded-md',
				)}
			>
				{productsCart.map(
					({ id, name, image, price, quantity, subtotalItem }, index) => (
						<>
							{typeComponentShopping === 'cart' ? (
								<Link key={id} href={`/products/${id}`}>
									<ProductCartOrCheckout
										id={id}
										name={name}
										price={price}
										image={image}
										subtotalItem={subtotalItem!}
										quantity={quantity}
										typeComponent={typeComponentShopping}
									/>
								</Link>
							) : (
								<ProductCartOrCheckout
									key={id}
									id={id}
									name={name}
									// typeOffer={typeOffer}
									price={price}
									image={image}
									subtotalItem={subtotalItem!}
									quantity={quantity}
									typeComponent={typeComponentShopping}
								/>
							)}

							{typeComponentShopping === 'cart' &&
								index < productsCart.length - 1 && (
									<Separator className="h-[0.025rem]" />
								)}
						</>
					),
				)}
			</ScrollArea>

			{/* subtotal, discount, total, shippingCost */}
			<div
				className={cn(
					'pt-2 mt-4 border-t border-gray-200 ',
					typeComponentShopping === 'cart' && 'mr-6',
				)}
			>
				<div className="flex justify-between mb-2">
					<span className="text-gray-600">Subtotal</span>
					<span className="font-semibold text-gray-800">
						S/ {subtotal.toFixed(2)}
					</span>
				</div>

				<div className="flex justify-between mb-2">
					<span className="text-gray-600">Descuento</span>
					<span className="font-semibold text-gray-800">
						- S/ {discount.toFixed(2)}
					</span>
				</div>

				{typeComponentShopping === 'checkout' && (
					<div className="flex justify-between mb-2">
						<span className="text-gray-600">Costo de envío</span>
						<span className="font-semibold text-gray-800">
							S/ {shippingCost.toFixed(2)}
						</span>
					</div>
				)}

				{typeComponentShopping === 'checkout' && (
					<Separator className="my-3 h-[0.025rem]" />
				)}

				<div
					className={cn(
						'flex justify-between',
						typeComponentShopping === 'cart' && 'mb-4',
					)}
				>
					<span className="text-gray-600 font-semibold">Total</span>
					<span className="font-semibold text-gray-800">
						S/{' '}
						{typeComponentShopping === 'checkout'
							? totalCheckout.toFixed(2)
							: totalCart.toFixed(2)}
					</span>
				</div>

				{typeComponentShopping === 'cart' && (
					<div className="flex justify-between items-center [&>a]:w-full [&>a>button]:w-full gap-3">
						<ButtonGeneral href="/cart" variant="outline" onClick={setShowCart}>
							Editar carrito
						</ButtonGeneral>
						<ButtonGeneral href="/checkout" onClick={setShowCart}>
							Comprar ahora
						</ButtonGeneral>
					</div>
				)}
			</div>
		</div>
	)
}
