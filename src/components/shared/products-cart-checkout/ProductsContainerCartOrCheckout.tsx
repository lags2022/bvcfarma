import { useShallow } from 'zustand/react/shallow'

import { useCartStore } from '@/context/useCartStore'
import { TypeComponentShopping } from '@/interfaces/type-component'

import { DetailsOrder } from '../DetailsOrder'

export const ProductsContainerCartOrCheckout = ({
	typeComponentShopping,
}: {
	typeComponentShopping: TypeComponentShopping
}) => {
	const {
		productsCart,
		subtotal,
		discount,
		totalCart,
		totalCheckout,
		shippingCost,
		setShowCart,
	} = useCartStore(
		useShallow((state) => ({
			productsCart: state.productsCart,
			subtotal: state.subtotal,
			discount: state.discount,
			totalCart: state.totalCart,
			setShowCart: state.setShowCart,
			totalCheckout: state.totalCheckout,
			shippingCost: state.shippingCost,
		})),
	)

	return (
		<>
			<h2 className="font-semibold text-gray-800 ">
				Bvcfarma ({productsCart.length})
			</h2>
			<DetailsOrder
				productsCart={productsCart}
				subtotal={subtotal}
				totalCart={totalCart}
				discount={discount}
				shippingCost={shippingCost}
				totalCheckout={totalCheckout}
				typeComponentShopping={typeComponentShopping}
				setShowCart={setShowCart}
			/>
		</>
	)
}
