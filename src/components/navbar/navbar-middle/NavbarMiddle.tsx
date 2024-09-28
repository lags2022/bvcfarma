'use client'

import { HeartIcon, Menu, TruckIcon, User, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { CartShopping } from '@/components/cart/CartShopping'
import { Facebook } from '@/components/svg/Facebook'
import { Instagram } from '@/components/svg/Instagram'
import { Youtube } from '@/components/svg/Youtube'
import { Button } from '@/components/ui/button'
import { LOGO_NAME } from '@/constants/general'

import { NavbarAutocomplete } from './NavbarAutocomplete'
import { NavbarMenuBarCategories } from './NavbarMenuBarCategories'
import { NavbarUser } from './NavbarUser'

// import { useLastRouteStore } from '@/context/useLastRouteStore'

export const NavbarMiddleSeccion = ({
	session,
}: {
	session: Session | null
}) => {
	// const setLastRoute = useLastRouteStore((state) => state.setLastRoute)

	return (
		<div className="contain flex items-center justify-between py-4 space-x-4 sm:space-x-6">
			{/* logo bvcfarma */}
			<div className="flex items-center justify-center space-x-2 sm:space-x-4">
				<NavbarMenuBarCategories />

				<Link href="/">
					<Image
						src={LOGO_NAME}
						alt="Logo Bvcfarma"
						width={150}
						height={50}
						className="max-w-none aspect-[143.5/40] w-auto h-8 sm:h-10 object-contain"
					/>
					{/* <Image
						src={LOGO}
						alt="Logo"
						width={50}
						height={50}
						className="block max-w-none sm:hidden aspect-square size-10 object-contain"
					/> */}
				</Link>

				<div className="hidden md:flex items-center justify-center space-x-3">
					<a href="#" rel="noopener noreferrer" target="_blank">
						<Instagram className="size-6 text-picker-3" />
					</a>
					<a href="#" rel="noopener noreferrer" target="_blank">
						<Facebook className="size-6 text-picker-3" />
					</a>
					<a href="#" rel="noopener noreferrer" target="_blank">
						<Youtube className="size-6 text-picker-3" />
					</a>
				</div>
			</div>

			{/* autocomplete */}

			{/* buttons user*/}
			<div className="flex-1 flex justify-end sm:justify-between items-center space-x-2">
				<NavbarAutocomplete />
				{/* checkout */}
				{/* <Link href="/checkout" onClick={() => setLastRoute('/checkout')}> */}
				<div className="flex justify-between items-center [&_a_button]:p-2 space-x-2">
					<Link className="hidden sm:block" href="/checkout">
						<Button variant="ghost">
							<TruckIcon className="text-picker-4" />
						</Button>
					</Link>

					{/* favorites */}
					{/* <Link href="/favorites" onClick={() => setLastRoute('/favorites')}> */}
					<Link className="hidden sm:block" href="/favorites">
						<Button variant="ghost">
							<HeartIcon className="text-picker-4" />
						</Button>
					</Link>

					{/* dark mode revisar quitar */}
					{/* <ThemeSwitch /> */}

					{/* user */}
					{!session ? (
						<ButtonGeneral
							href="/login"
							variant="ghost"
							className="*:flex *:gap-1"
						>
							<User className="text-picker-4" />
							<span className="hidden lg:block">Iniciar Sesión</span>
						</ButtonGeneral>
					) : (
						<NavbarUser session={session} />
					)}

					{/* cart */}
					<CartShopping />
				</div>
			</div>
		</div>
	)
}
