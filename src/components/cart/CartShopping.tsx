import { ShoppingCart } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCartStore } from '@/context/useCartStore'

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
				<Button className="bg-picker-2 group hover:bg-picker-3 flex items-center justify-center gap-1 transition-[background] ease-in-out p-2">
					<ShoppingCart className="text-picker-4 group-hover:text-picker-1 transition-[color] ease-in-out" />
					<span className="text-picker-4 group-hover:text-picker-1 font-semibold text-base transition-[color] ease-in-out">
						{productsCart.length}
					</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="pr-0">
				{productsCart.length > 0 ? (
					<ProductsContainerCartOrCheckout typeComponentShopping="cart" />
				) : (
					<CartShoppingEmpty typeComponent="cart" />
				)}
			</SheetContent>
		</Sheet>
	)
}
