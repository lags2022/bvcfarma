'use server'

import { orderController } from '@/lib/factoryController'

import { getIdFromSession } from './session-action'

export async function getOrdersByUser() {
	try {
		const userId = await getIdFromSession()

		const orders = await orderController().getAllByUserId(userId!)

		return orders
	} catch (error) {
		throw error
	}
}

export async function getAllOrders() {
	try {
		const orders = await orderController().getAllForDashboard()

		return orders
	} catch (error) {
		throw error
	}
}
