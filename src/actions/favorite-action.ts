'use server'

import { getUserAction } from '@/actions/user-action'
import { userController } from '@/lib/factoryController'

export async function addFavoriteAction(productId: number) {
	try {
		const userId = (await getUserAction())?.id

		if (!userId) {
			return
		}

		const { message, status } = await userController().addFavorite(
			userId,
			productId,
		)

		return {
			message,
			status,
		}
	} catch (error) {
		throw error
	}
}

export async function removeFavoriteAction(productId: number) {
	try {
		const user = await getUserAction()

		if (!user) {
			return
		}
		const updatedFavorites = user?.favorites.filter((id) => id !== productId)

		const { message, status } = await userController().removeFavorite(
			user.id,
			updatedFavorites,
		)

		return {
			message,
			status,
		}
	} catch (error) {
		throw error
	}
}
