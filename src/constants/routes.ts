export const ROUTES_PUBLIC = ['/']
export const ROUTES_AUTH = ['/login']
export const ROUTES_CUSTOMER = [
	'/checkout',
	'/favorites',
	'/profile',
	'/orders',
]
export const ROUTES_OWNER = ['/dashboard']
export const ROUTES_ADMIN = ['/admin']
export const ROUTES_PROTECTED = [...ROUTES_OWNER, ...ROUTES_ADMIN]
