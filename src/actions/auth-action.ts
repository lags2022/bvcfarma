'use server'

import { hashSync } from 'bcryptjs'
import { AuthError } from 'next-auth'

import { signIn, signOut } from '@/auth'
import { userController } from '@/lib/factoryController'
import { registerSchema } from '@/schemas/auth-schema'

export async function loginAction({
	formData,
	redirectTo = '/',
}: {
	formData: FormData
	redirectTo?: string
}) {
	try {
		await signIn('credentials', {
			...Object.fromEntries(formData),
			redirectTo,
		})

		// return {
		// 	message: 'Inicio de sesión exitoso',
		// 	status: 'success',
		// }
	} catch (error) {
		if (error instanceof AuthError) {
			throw new Error(error.message)
			// return {
			// 	message: 'Error al iniciar sesión',
			// 	error: error.type,
			// }
		}
		throw error
	}
}

export async function logoutAction() {
	await signOut({
		redirectTo: '/',
	})
}

export async function registerAction(formData: FormData) {
	try {
		const { password, ...restOfData } = await registerSchema.parseAsync(
			Object.fromEntries(formData),
		)

		const userCreated = await userController().create({
			...restOfData,
			password: hashSync(password, 10),
		})

		await signIn('credentials', {
			email: userCreated.email,
			password,
			redirectTo: '/',
		})
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				message: 'Error al iniciar sesión',
				error: error.type,
			}
		}
		throw error
	}

	// return {
	// 	message: 'Error al registrarse',
	// 	error: true,
	// }
}
