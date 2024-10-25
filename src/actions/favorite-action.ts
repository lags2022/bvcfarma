'use server'

import { getUser } from '@/actions/user-action'
import { userController } from '@/lib/factoryController'

export async function addFavoriteAction(productId: number) {
	try {
		const userId = (await getUser(false))?.id

		if (!userId) {
			return {
				message: 'No tienes sesión iniciada',
				status: 'errorLogin',
			}
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
		const user = await getUser()

		if (!user) {
			return {
				message: 'No tienes sesión iniciada',
				status: 'errorLogin',
			}
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
