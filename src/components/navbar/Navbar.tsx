import { auth } from '@/auth'
import {
	getCategories,
	getSubCategories,
	getSubSubCategories,
} from '@/services/getProducts'

import { NavbarMiddleSeccion } from './navbar-middle/NavbarMiddle'
import { NavbarBottonSeccion } from './NavbarBottonSeccion'
import { NavbarTopSeccion } from './NavbarTopSeccion'

export const Navbar = async () => {
	const session = await auth()

	const [categories, subcategories, subsubcategories] = await Promise.all([
		getCategories(),
		getSubCategories(),
		getSubSubCategories(),
	])

	categories.push(
		{
			id: 10,
			name: 'adulto mayor',
			icon: '👨‍👩‍👧‍👦',
		},
		{
			id: 11,
			name: 'dermocosmetica',
			icon: '💄',
		},
		{
			id: 12,
			name: 'infantil',
			icon: '👶',
		},
		{
			id: 13,
			name: 'maternidad',
			icon: '👩‍🦰',
		},
    {
      id: 14,
      name: "blog",
      icon: "📝",
    }
	)

	return (
		<header className="w-full bg-white top-0 fixed z-50">
			<NavbarTopSeccion />
			<NavbarMiddleSeccion session={session} />
			<NavbarBottonSeccion
				categories={categories}
				subcategories={subcategories}
				subsubcategories={subsubcategories}
			/>
		</header>
	)
}
