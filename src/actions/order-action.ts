'use server'

import { orderController } from '@/lib/factoryController'

import { getIdFromSession } from './session-action'

export async function getOrders() {
	try {
		const userId = await getIdFromSession()

		const orders = await orderController().getAllByUserId(userId!)

		return orders
	} catch (error) {
		throw error
	}
}
