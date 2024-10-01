import { ShoppingCart } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCartStore } from '@/context/useCartStore'
import { cn } from '@/lib/utils'

import { CartShoppingEmpty } from '../shared/CartShoppingEmpty'
import { ProductsContainerCartOrCheckout } from '../shared/products-cart-checkout/ProductsContainerCartOrCheckout'

export const CartShopping = () => {
	const { productsCart, showCart, setShowCart } = useCartStore(
		useShallow((state) => ({
			productsCart: state.productsCart,
			showCart: state.showCart,
			setShowCart: state.setShowCart,
		})),
	)

	return (
		<Sheet open={showCart} onOpenChange={setShowCart}>
			<SheetTrigger asChild>
				<Button
					variant={'ghost'}
					className={cn(
						'hover:bg-transparent sm:hover:bg-picker-1 transition-[background] duration-300 ease-in-out py-2 px-1 sm:pl-3.5 sm:pr-4 relative',
						productsCart.length && 'justify-start',
					)}
				>
					<ShoppingCart className="text-picker-4 size-5" />
					{productsCart.length ? (
						<span className="absolute translate-y-1.5 translate-x-2.5 rounded-full bg-picker-4 px-[4.5px] py-0 w-4 text-white font-semibold text-xs ">
							{productsCart.length}
						</span>
					) : null}
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="pr-0 w-screen sm:max-w-md">
				{productsCart.length > 0 ? (
					<ProductsContainerCartOrCheckout typeComponentShopping="cart" />
				) : (
					<CartShoppingEmpty typeComponent="cart" />
				)}
			</SheetContent>
		</Sheet>
	)
}
