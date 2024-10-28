import { Role } from '@prisma/client'
import { Session } from 'next-auth'

import { DropdownArrow } from '@/components/svg/DropdownArrow'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { NavbarItemType } from '@/constants/navbar-link'

import { AvatarCustom } from './AvatarCustom'
import { NavbarLink } from '../navbar/navbar-middle/NavbarLink'
import { Button } from '../ui/button'

export const NavbarUserContent = ({
	session,
	navbarItems,
	pathname,
	handleLogout,
}: {
	session?: Session
	navbarItems: NavbarItemType[]
	pathname: string
	handleLogout: () => void
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="hidden sm:flex cursor-pointer justify-center items-center group px-2"
				>
					<AvatarCustom session={session} />
					<p className="ml-2 font-medium truncate w-20 text-base hidden md:block">
						{session?.user?.name || 'Usuario'}
					</p>
					<DropdownArrow className="text-gray-500 transition-[color] ease duration-300 group-hover:text-black hidden md:block" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="hidden sm:block w-36">
				{navbarItems
					.filter((item) => {
						if (item.label === 'Mis favoritos') return false

						return item.role.includes(session?.user?.role as Role)
					})
					.map((item) => (
						<div key={item.id}>
							{item.label === 'Cerrar sesión' && (
								<Separator className="my-1 w-[93%] mx-auto" />
							)}
							<NavbarLink
								href={item.href}
								icon={item.icon}
								label={item.label}
								isActive={pathname === item.href}
								onClick={() => item.label === 'Cerrar sesión' && handleLogout()}
							/>
						</div>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
