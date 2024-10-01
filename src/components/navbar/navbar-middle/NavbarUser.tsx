import { Role } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'

import { logoutAction } from '@/actions/auth-action'
import { AvatarCustom } from '@/components/shared/AvatarCustom'
import { DropdownArrow } from '@/components/svg/DropdownArrow'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { NAVBAR_ITEMS } from '@/constants/navbar-link'
import { useFavoriteStore } from '@/context/useFavoriteStore'

import { NavbarLink } from './NavbarLink'

export const NavbarUser = ({ session }: { session?: Session }) => {
	const setFavorites = useFavoriteStore((state) => state.setFavorites)
	const userRole = session?.user?.role as Role

	const pathname = usePathname()

	const handleLogout = () => {
		setFavorites([])
		logoutAction()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="hidden sm:flex cursor-pointer justify-center items-center w-full group px-2"
				>
					<AvatarCustom session={session} />
					<p className="ml-2 font-medium truncate w-20 text-base hidden md:block">
						{session?.user?.name}
					</p>
					<DropdownArrow className="text-gray-500 transition-[color] ease duration-300 group-hover:text-black hidden md:block" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="hidden sm:block w-36">
				{NAVBAR_ITEMS.filter((item) => {
					if (item.label === 'Mis favoritos') return false

					return item.role.includes(userRole)
				}).map((item) => (
					<>
						{item.label === 'Cerrar sesión' && (
							<Separator className="my-1 w-[93%] mx-auto" />
						)}
						<NavbarLink
							key={item.id}
							href={item.href}
							icon={item.icon}
							label={item.label}
							isActive={pathname === item.href}
							onClick={() => item.label === 'Cerrar sesión' && handleLogout()}
						/>
					</>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
