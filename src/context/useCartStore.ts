import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { DELIVERY_COST } from '@/constants/enum-mod'
import { TypeOffer } from '@/interfaces/products'

import { useCheckoutStore } from './useCheckoutStore'

export interface CartShoppingProduct {
	id: number
	name: string
	image: string
	price: string
	typeOffer?: TypeOffer
	subtotalItem: number
	quantity: number
}

interface useCartStoreState {
	productsCart: CartShoppingProduct[]
	subtotal: number
	discount: number
	totalCart: number
	shippingCost: number
	totalCheckout: number
	showCart: boolean
	addProduct: (product: CartShoppingProduct) => void
	incrementQuantity: (productId: number) => void
	decrementQuantity: (productId: number) => void
	removeProduct: (productId: number) => void
	setTotal: () => void
	setShowCart: () => void
	setShippingCost: (shippingCost: number) => void
}

export const useCartStore = create<useCartStoreState>()(
	persist(
		(set, get) => ({
			productsCart: [],
			subtotal: 0,
			discount: 0,
			totalCart: 0,
			showCart: false,
			shippingCost: 0,
			totalCheckout: 0,
			addProduct: (product) => {
				const state = get()

				set({
					productsCart: [...state.productsCart, product],
				})

				state.setTotal()
			},
			incrementQuantity: (productId) => {
				const state = get()

				set({
					productsCart: state.productsCart.map((item) =>
						item.id === productId
							? {
									...item,
									quantity: item.quantity + 1,
									subtotalItem:
										Math.round(
											parseFloat(item.price) * (item.quantity + 1) * 100,
										) / 100,
								}
							: item,
					),
				})

				state.setTotal()
			},
			decrementQuantity: (productId) => {
				const state = get()
				set({
					productsCart: state.productsCart.map((item) =>
						item.id === productId
							? {
									...item,
									quantity: item.quantity - 1,
									subtotalItem:
										Math.round(
											parseFloat(item.price) * (item.quantity - 1) * 100,
										) / 100,
								}
							: item,
					),
				})

				state.setTotal()
			},
			removeProduct: (productId: number) => {
				const state = get()
				set({
					productsCart: state.productsCart.filter(
						(item) => item.id !== productId,
					),
				})

				state.setTotal()
			},
			setTotal: () => {
				const state = get()

				const subtotal =
					Math.round(
						state.productsCart.reduce(
							(total, item) => total + parseFloat(item.price) * item.quantity,
							0,
						) * 100,
					) / 100

				const discount = Math.round(subtotal * 0.1 * 100) / 100

				const totalCart =
					subtotal - discount >= 0
						? Math.round((subtotal - discount) * 100) / 100
						: 0

				const totalCheckout = totalCart + state.shippingCost

				set({ subtotal, discount, totalCart, totalCheckout })
			},
			setShowCart: () => {
				const state = get()
				set({ showCart: !state.showCart })
			},
			setShippingCost: (shippingCost: number) => {
				const state = get()

				set({ shippingCost })

				state.setTotal()
			},
		}),
		{
			name: 'shopping-cart',
		},
	),
)

useCheckoutStore.subscribe((state) =>
	useCartStore.getState().setShippingCost(DELIVERY_COST[state.deliveryType]),
)
