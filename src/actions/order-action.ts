'use server'

import { orderController } from '@/lib/factoryController'

import { getUserAction } from './user-action'

export async function getOrders() {
	try {
		const user = await getUserAction()

		if (!user) {
			throw new Error('No hay usuario autenticado')
		}

		const orders = await orderController().getAllByUserId(user.id)

		return orders
	} catch (error) {
		throw error
	}
}
