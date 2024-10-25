'use server'

import { orderController } from '@/lib/factoryController'

export async function getOrderItems(orderId: string) {
	try {
		const orderItems = await orderController().getByField(
			'id',
			orderId,
			false,
			false,
			true,
		)
		return orderItems
	} catch (error) {
		throw error
	}
}
