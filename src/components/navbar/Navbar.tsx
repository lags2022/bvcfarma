import { auth } from '@/auth'
import { getCategoriesData } from '@/services/getProducts'

import { NavbarMiddleSeccion } from './navbar-middle/NavbarMiddle'
import { NavbarBottonSeccion } from './NavbarBottonSeccion'
import { NavbarTopSeccion } from './NavbarTopSeccion'

export const Navbar = async () => {
	const session = await auth()

	const { tipos, categories, subCategories } = await getCategoriesData()

	return (
		<header className="w-full border-b border-picker-2 bg-white top-0 fixed z-50">
			<NavbarTopSeccion />
			<NavbarMiddleSeccion session={session} />
			<NavbarBottonSeccion
				tipos={tipos}
				categories={categories}
				subCategories={subCategories}
			/>
		</header>
	)
}
