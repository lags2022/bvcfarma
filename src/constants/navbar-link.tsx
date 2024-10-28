import {
	LayoutDashboard,
	LogOut,
	ShoppingBag,
	User,
	Heart,
	ShoppingBasket,
} from 'lucide-react'

// para el usuario customer, merchant y owner dentro del ecommerce
export const NAVBAR_ITEMS = [
	{
		id: 1,
		icon: <LayoutDashboard />,
		label: 'Mi dashboard',
		href: '/dashboard',
		role: ['OWNER'],
	},
	{
		id: 2,
		icon: <User />,
		label: 'Mi cuenta',
		href: '/profile',
		role: ['CUSTOMER', 'MERCHANT'],
	},
	{
		id: 3,
		icon: <Heart />,
		label: 'Mis favoritos',
		href: '/favorites',
		role: ['CUSTOMER', 'MERCHANT'],
	},
	{
		id: 4,
		icon: <ShoppingBag />,
		label: 'Mis pedidos',
		href: '/orders',
		role: ['CUSTOMER', 'MERCHANT'],
	},
	{
		id: 5,
		icon: <LogOut />,
		label: 'Cerrar sesión',
		role: ['OWNER', 'CUSTOMER', 'MERCHANT'],
	},
]

// para el usuario owner dentro de su dashboard
export const NAVBAR_ITEMS_DASHBOARD = [
	{
		id: 1,
		icon: <ShoppingBasket />,
		label: 'Ir a mi tienda',
		href: '/',
    role: ['OWNER'],
	},
	{
		id: 2,
		icon: <LogOut />,
		label: 'Cerrar sesión',
    role: ['OWNER'],
	},
]

export type NavbarItemType = (typeof NAVBAR_ITEMS)[number]
