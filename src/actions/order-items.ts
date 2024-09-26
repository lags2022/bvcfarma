'use server'

import { orderItemsController } from '@/lib/factoryController'

export async function getOrderItems(orderId: string) {
	try {
		const orderItems = await orderItemsController().getAllByOrderId(orderId)

		return orderItems
	} catch (error) {
		throw error
	}
}
