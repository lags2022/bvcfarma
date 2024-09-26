import { StatusOrder } from '@prisma/client'
import { create } from 'zustand'

interface OrderDetails {
	orderId: string
	subtotal: number
	discount: number
	totalCart: number
	shippingCost: number
	totalCheckout: number
  status: string
}

interface OrderItemsState {
	slideIn: boolean
	setSlideIn: (slideIn: boolean) => void
	details: OrderDetails
	setDetails: (details: OrderDetails) => void
}

export const useOrderItemsStore = create<OrderItemsState>((set) => ({
	slideIn: false,
	details: {
		orderId: '',
		subtotal: 0,
		discount: 0,
		totalCart: 0,
		shippingCost: 0,
		totalCheckout: 0,
    status: 'VALIDATING',
	},
	setDetails: (details) => set({ details }),
	setSlideIn: (slideIn) => set({ slideIn }),
}))
