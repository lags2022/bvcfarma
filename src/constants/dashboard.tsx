import {
	LayoutDashboard,
	Package,
	Users,
	BarChart2,
	Settings,
	HelpCircle,
  ShoppingBag,
} from 'lucide-react'

export const SIDEBAR_ITEMS = [
	{
		icon: <LayoutDashboard />,
		label: 'General',
		href: '/dashboard',
	},
	{
		icon: <ShoppingBag />,
		label: 'Ordenes',
		href: '/dashboard/orders',
    badge: '15'
	},
	{
		icon: <Package />,
		label: 'Productos',
		href: '/dashboard/products',
	},
	{
		icon: <BarChart2 />,
		label: 'Analíticas',
		href: '/dashboard/analytics',
	},
	{
		icon: <Users />,
		label: 'Clientes',
		href: '/dashboard/customers',
	},
	{
		icon: <Settings />,
		label: 'Ajustes',
		href: '/dashboard/settings',
	},
	{
		icon: <HelpCircle />,
		label: 'Ayuda',
		href: '/dashboard/help',
	},
]