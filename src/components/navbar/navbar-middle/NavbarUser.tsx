import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

import { logoutAction } from '@/actions/auth-action'
import { NavbarUserContent } from '@/components/shared/NavbarUserContent'
import { NAVBAR_ITEMS } from '@/constants/navbar-link'
import { useFavoriteStore } from '@/context/useFavoriteStore'

export const NavbarUser = ({ session }: { session?: Session }) => {
	const setFavorites = useFavoriteStore((state) => state.setFavorites)
	const pathname = usePathname()

	const handleLogout = () => {
		setFavorites([])
		logoutAction()
	}

	return (
		<NavbarUserContent
			session={session}
			navbarItems={NAVBAR_ITEMS}
			pathname={pathname}
			handleLogout={handleLogout}
		/>
	)
}
