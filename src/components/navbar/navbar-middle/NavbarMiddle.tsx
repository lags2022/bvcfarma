'use client'

import { HeartIcon, SearchIcon, TruckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { CartShopping } from '@/components/cart/CartShopping'
import { Facebook } from '@/components/svg/Facebook'
import { Instagram } from '@/components/svg/Instagram'
import { Youtube } from '@/components/svg/Youtube'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { NavbarAutocomplete } from './NavbarAutocomplete'
import { NavbarUser } from './NavbarUser'

// import { useLastRouteStore } from '@/context/useLastRouteStore'

export const NavbarMiddleSeccion = ({
	session,
}: {
	session: Session | null
}) => {
	// const setLastRoute = useLastRouteStore((state) => state.setLastRoute)

	return (
		<div className="container mx-auto flex items-center justify-between py-4">
			{/* logo bvcfarma */}
			<div className="flex items-center justify-center space-x-4">
				<Link href="/">
					<Image
						src="/images/logo_bvc.webp"
						alt="Logo"
						width={150}
						height={50}
						className="w-auto h-10 aspect-[143.5/40]"
					/>
				</Link>
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

			{/* autocomplete */}
			<NavbarAutocomplete />

			{/* buttons user*/}
			<div className="flex items-center space-x-2 [&_a_button]:p-2">
				{/* checkout */}
				{/* <Link href="/checkout" onClick={() => setLastRoute('/checkout')}> */}
				<Link href="/checkout">
					<Button variant="ghost">
						<TruckIcon className="text-picker-5" />
					</Button>
				</Link>

				{/* favorites */}
				{/* <Link href="/favorites" onClick={() => setLastRoute('/favorites')}> */}
				<Link href="/favorites">
					<Button variant="ghost">
						<HeartIcon className="text-picker-5" />
					</Button>
				</Link>

				{/* dark mode revisar quitar */}
				{/* <ThemeSwitch /> */}

				{/* user */}
				{!session ? (
					<ButtonGeneral
						href="/login"
						variant="ghost"
						className="focus:outline-none"
					>
						Iniciar Sesión
					</ButtonGeneral>
				) : (
					<NavbarUser session={session} />
				)}

				{/* cart */}
				<CartShopping />
			</div>
		</div>
	)
}
