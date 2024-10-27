'use server'

import { redirect } from 'next/navigation'

import { auth, updateSession } from '@/auth'
import { userController } from '@/lib/factoryController'
import { UserUpdateProfileSchemaType } from '@/schemas/profile-schema'

import { logoutAction } from './auth-action'
import { getIdFromSession } from './session-action'

// obtener el usuario por id
async function getUserById({ userId }: { userId: string }) {
	try {
		const user = await userController().getById(userId)

		return user
	} catch (error) {
		throw error
	}
}

// obtener el usuario desde la id de la sesion
export async function getUser(shouldRedirect: boolean = true) {
	try {
		const userId = await getIdFromSession(shouldRedirect)

		const user = await getUserById({ userId: userId! })

		return user
	} catch (error) {
		throw error
	}
}

// obtener el usuario con el address desde la id de la sesion
export async function getUserWithAddress() {
	try {
		const userId = await getIdFromSession()

		const user = await userController().getByIdWithAddress(userId!)

		return user
	} catch (error) {
		throw error
	}
}

// update user
export async function updateUser(dataUpdate: UserUpdateProfileSchemaType) {
	try {
		const userId = await getIdFromSession()

		const userUpdate = await userController().update(userId!, dataUpdate)

		if (userUpdate.status === 'success') {
			await updateSession({
				user: {
					name: userUpdate.data.name,
					image: userUpdate.data.address.image || '',
				},
			})
		}

		redirect('/profile')
	} catch (error) {
		throw error
	}
}

// delete user: change active
export async function deleteUser() {
	try {
		const userId = await getIdFromSession()

		const userDelete = await userController().delete(userId!)

		if (userDelete.status === 'success') {
			await logoutAction()
		}
	} catch (error) {
		throw error
	}
}

// update password
export async function updatePassword(password: string) {
	try {
		const userId = await getIdFromSession()

		const userUpdate = await userController().updatePassword(userId!, password)

		if (userUpdate.status === 'success') {
			return userUpdate
		}
	} catch (error) {
		throw error
	}
}
