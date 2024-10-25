import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'

import { userController } from './lib/factoryController'
import { loginSchema } from './schemas/auth-schema'

export const {
	handlers,
	signIn,
	signOut,
	auth,
	unstable_update: updateSession,
} = NextAuth({
	pages: {
		signIn: '/login',
	},
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' },
			},
			authorize: async (credentials) => {
				try {
					const { email, password } = await loginSchema.parseAsync(credentials)

					const user = await userController().getByEmail(email, password)

					return user
				} catch (error) {
					if (error instanceof ZodError) {
						// Return `null` to indicate that the credentials are invalid
						return null
					}

					throw error
				}
			},
		}),
	],
	callbacks: {
		jwt({ token, user, session }) {
			if (user) {
				token.role = user.role
				// token.colorTheme = user.colorTheme
				token.id = user.id
				token.image = user?.address?.image ?? ''
			}

			// esto es para que se actualice el name y la image en la session y se muestre en el header
			if (session?.user?.name) {
				token.name = session.user.name
			}
			if (session?.user?.image || session?.user?.image === '') {
				token.image = session.user.image
			}

			return token
		},
		session({ session, token }) {
			if (session?.user) {
				session.user.role = token.role
				// session.user.colorTheme = token.colorTheme
				session.user.id = token.id as string
				session.user.image = token.image
			}
			return session
		},
	},
})
