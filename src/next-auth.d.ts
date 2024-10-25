import { User } from '@auth/core/types'
import { UserAddress } from '@prisma/client'
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: DefaultSession['user'] & {
			role?: string
			colorTheme?: string
			address?: {
        image: string
      }
		}
	}

	interface User extends DefaultUser {
		role: string
		colorTheme: string
		address?: {
			image: string
		}
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		role?: string
		colorTheme?: string
    image?: string
	}
}

declare module '@auth/core/types' {
	interface User {
		role?: string
		colorTheme?: string
    address: UserAddress | null
	}
}
