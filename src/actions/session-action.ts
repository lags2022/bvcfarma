'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'

// obtener el id de la sesion, hacemos esto afuera de otra funcion action server  por temas de error en el bundle de next: headers
export async function getIdFromSession(shouldRedirect: boolean = true) {
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
		throw error
	}
}
