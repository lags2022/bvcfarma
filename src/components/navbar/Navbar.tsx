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

	return (
		<header className="w-full top-0 fixed z-50 bg-white">
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
