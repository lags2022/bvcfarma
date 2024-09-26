'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { userController } from '@/lib/factoryController'

export async function getUserByIdAction({ userId }: { userId: string }) {
	try {
		const user = await userController().getById(userId)

		return user
	} catch (error) {
		throw error
	}
}

export async function getUserAction(shouldRedirect: boolean = true) {
	try {
		const session = await auth()
		const userId = session?.user.id

		if (!userId) {
			if (shouldRedirect) {
				redirect('/login')
			} else {
				// throw new Error('No hay usuario autenticado')
				return
			}
		}

		const user = await getUserByIdAction({ userId })

		return user
	} catch (error) {
		throw error
	}
}
