import { LayoutDashboard, LogOut, ShoppingBag, User, Heart } from 'lucide-react'

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
		role: ['CUSTOMER'],
	},
	{
		id: 3,
		icon: <Heart />,
		label: 'Mis favoritos',
		href: '/favorites',
		role: ['CUSTOMER'],
	},
	{
		id: 4,
		icon: <ShoppingBag />,
		label: 'Mis pedidos',
		href: '/orders',
		role: ['CUSTOMER'],
	},
	{
		id: 5,
		icon: <LogOut />,
		label: 'Cerrar sesión',
		role: ['OWNER', 'CUSTOMER'],
	},
]
