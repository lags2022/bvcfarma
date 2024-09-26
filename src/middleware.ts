import { auth } from '@/auth'

import {
	ROUTES_LOGIN,
	ROUTES_AUTH,
	ROUTES_PROTECTED,
	ROUTES_PUBLIC,
	ROUTES_ADMIN,
	ROUTES_USER,
} from './constants/routes'

export default auth(({ auth, nextUrl }) => {
	const isLoggedIn = !!auth?.user
	const role = auth?.user?.role

	const redirectUrlMod = (route: string[]) => new URL(route[0], nextUrl.origin)

	const routesMapping = [
		{
			routes: ROUTES_LOGIN,
			condition: !isLoggedIn,
			redirectUrl: redirectUrlMod(ROUTES_AUTH),
		},
		{
			routes: ROUTES_PROTECTED,
			condition: !isLoggedIn,
			redirectUrl: redirectUrlMod(ROUTES_PUBLIC),
		},
		{
			routes: ROUTES_ADMIN,
			condition: role === 'USER',
			redirectUrl: redirectUrlMod(ROUTES_USER),
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
