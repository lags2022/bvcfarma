import { Role } from '@prisma/client'

import { auth } from '@/auth'

import {
	ROUTES_CUSTOMER,
	ROUTES_AUTH,
	ROUTES_PROTECTED,
	ROUTES_PUBLIC,
	ROUTES_ADMIN,
	ROUTES_OWNER,
} from './constants/routes'

export default auth(({ auth, nextUrl }) => {
	const isLoggedIn = !!auth?.user
	const role = auth?.user?.role as Role

	const redirectUrlMod = (route: string[]) => new URL(route[0], nextUrl.origin)

	const routesMapping = [
		{
			routes: ROUTES_CUSTOMER,
			condition: !isLoggedIn,
			redirectUrl: redirectUrlMod(ROUTES_AUTH),
		},
		{
			routes: ROUTES_PROTECTED,
			condition: !isLoggedIn || ['CUSTOMER', 'MERCHANT'].includes(role),
			redirectUrl: redirectUrlMod(ROUTES_PUBLIC),
		},
		{
			routes: ROUTES_ADMIN,
			condition: role === 'OWNER',
			redirectUrl: redirectUrlMod(ROUTES_OWNER),
		},
	]

	for (const { routes, condition, redirectUrl } of routesMapping) {
		if (
			routes.some((route) => nextUrl.pathname.startsWith(route)) &&
			condition
		) {
			return Response.redirect(redirectUrl)
		}
	}
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
