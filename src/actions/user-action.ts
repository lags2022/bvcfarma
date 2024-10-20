'use server'

import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { userController } from '@/lib/factoryController'

import { USERS_FIELD_TEST } from '../../scripts/db/data'

async function getUserIdBySession(shouldRedirect: boolean = true) {
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

		return userId
	} catch (error) {
		console.log(error, 'Error en el getUserIdBySession')
		throw error
	}
}

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

		// const userId = await getUserIdBySession(shouldRedirect)

		// if (!userId) {
		// 	return
		// }

		const user = await getUserByIdAction({ userId })

		return user
	} catch (error) {
		throw error
	}
}

export async function getUserWithUserAddressAction(
	shouldRedirect: boolean = true,
) {
	try {
		const userId = await getUserIdBySession(shouldRedirect)

		if (!userId) {
			return
		}

		const user = await userController().getUserWithUserAddress(userId)

		return user
	} catch (error) {
		throw error
	}
}