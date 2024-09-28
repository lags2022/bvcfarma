import Link from 'next/link'
import { Session } from 'next-auth'

import { logoutAction } from '@/actions/auth-action'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useFavoriteStore } from '@/context/useFavoriteStore'

export const NavbarUser = ({ session }: { session?: Session }) => {
	const setFavorites = useFavoriteStore((state) => state.setFavorites)

	const handleLogout = () => {
		setFavorites([])
		logoutAction()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className=" cursor-pointer ring-gray-200 ring-2 ring-offset-1">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>
						{session?.user
							?.name!.split(' ')
							.slice(0, 2)
							.map((part: string) => part[0])
							.join('')
							.toLocaleUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="[&_a_div]:cursor-pointer">
				{session?.user?.role === 'OWNER' && (
					<Link href="/dashboard">
						<DropdownMenuItem>Mi dashboard</DropdownMenuItem>
					</Link>
				)}
				<Link href="/profile">
					<DropdownMenuItem>Mi cuenta</DropdownMenuItem>
				</Link>
				<Link className="sm:hidden" href="/checkout">
					<DropdownMenuItem>Mi pedido</DropdownMenuItem>
				</Link>
				<Link className="sm:hidden" href="/favorites">
					<DropdownMenuItem>Mis favoritos</DropdownMenuItem>
				</Link>
				<Link href="/orders">
					<DropdownMenuItem>Mis ordenes</DropdownMenuItem>
				</Link>
				<Separator className="my-1 w-[93%] mx-auto" />
				<form action={handleLogout} className="w-full">
					<Button
						type="submit"
						variant="ghost"
						className="block justify-start bg-transparent hover:bg-transparent w-full h-fit p-0 m-0"
					>
						<DropdownMenuItem className="cursor-pointer">
							Cerrar sesión
						</DropdownMenuItem>
					</Button>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
