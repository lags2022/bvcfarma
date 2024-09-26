import { z } from 'zod'

import { OrderGetAll } from '@/interfaces/orders/order-get-all'

import {
	DELIVERY_TYPE_MOD,
	PAYMENT_METHOD_MOD,
	STATUS_ORDER_MOD,
} from '../constants/enum-mod'

export const transformedOrders = (orders: OrderGetAll[]) =>
	orders.map((order) => ({
		id: order.id,
		ocNumber: order.ocNumber,
		status: STATUS_ORDER_MOD[order.status],
		paidAt: order.paidAt ? new Date(order.paidAt) : undefined, // Asegúrate de convertir a Date si es necesario
		paymentMethod: PAYMENT_METHOD_MOD[order.paymentMethod],
		deliveryType: DELIVERY_TYPE_MOD[order.deliveryType],
		quantityItems: order.quantityItems,
		total: order.total,
		totalCart: order.totalCart,
		discount: order.discount,
		subtotal: order.subtotal,
		shippingCost: order.shippingCost,
		customer: order.orderAddress
			? `${order.orderAddress.firstName} ${order.orderAddress.lastName}`
			: order.user.email, // Si no hay dirección, usa el correo del usuario
		address: order.orderAddress?.address ?? 'Recojo en tienda', // Si no hay dirección, usa 'Recojo en tienda'
	}))

export const orderSchema = z.object({
	id: z.string(),
	ocNumber: z.string(),
	status: z.string(),
	paidAt: z.date().optional(),
	paymentMethod: z.string(),
	deliveryType: z.string(),
	quantityItems: z.number(),
	total: z.number(),
	totalCart: z.number(),
	discount: z.number(),
	subtotal: z.number(),
	shippingCost: z.number(),
	customer: z.string(), // Este campo se calculará en base a los datos de `orderAddress` o `user.email`.
	address: z.string(), // Dirección de envío o 'Recojo en tienda'.
})

export type OrderSchemaType = z.infer<typeof orderSchema>
