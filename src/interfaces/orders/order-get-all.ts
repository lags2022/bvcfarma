import { DeliveryType, PaymentMethod, StatusOrder } from '@prisma/client'

export interface OrderGetAll {
	id: string
	ocNumber: string
	status: StatusOrder
	paidAt: Date
	paymentMethod: PaymentMethod
	deliveryType: DeliveryType
	quantityItems: number
	total: number
	totalCart: number
	discount: number
	subtotal: number
	shippingCost: number
	orderAddress?: {
		firstName: string
		lastName: string
		address: string
	}
	user: {
		email: string
	}
	orderItems?: {
		id: number
		price: string
		quantity: number
		name: string
		image: string
		subtotalItem: number
	}[]
}

// district: string
// province: string
// department: string
