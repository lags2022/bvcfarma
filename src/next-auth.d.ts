import { User } from '@auth/core/types'
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & {
			role?: string
			colorTheme?: string
		}
	}

	interface User extends DefaultUser {
		role: string
		colorTheme: string
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role?: string
		colorTheme?: string
	}
}

declare module '@auth/core/types' {
	interface User {
		role?: string
		colorTheme?: string
	}
}
