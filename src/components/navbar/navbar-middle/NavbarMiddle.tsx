'use client'

import { HeartIcon, Menu, TruckIcon, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { CartShopping } from '@/components/cart/CartShopping'
// import { Social } from '@/components/social/Social'
import { Button } from '@/components/ui/button'
import { LOGO_NAME } from '@/constants/general'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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
	const isTablet = useMediaQuery('(min-width: 640px)')

	return (
		<div className="contain flex items-center justify-between py-3 space-x-4 sm:space-x-6">
			{/* logo bvcfarma */}
			<div className="flex flex-grow basis-0 items-center space-x-2 sm:space-x-4">
				{!isTablet ? (
					<NavbarMenuBarCategories />
				) : (
					<Menu className="block sm:hidden text-picker-4" />
				)}

				{isTablet && (
					<Link className="sm:!ml-0" href="/">
						<Image
							src={LOGO_NAME}
							alt="Logo Bvcfarma"
							width={150}
							height={50}
							className="max-w-none aspect-[143.5/40] w-auto h-11 object-contain"
						/>
					</Link>
				)}
			</div>

			{!isTablet ? (
				<Link href="/">
					<Image
						src={LOGO_NAME}
						alt="Logo Bvcfarma"
						width={150}
						height={50}
						className="max-w-none aspect-[143.5/40] w-auto h-11 object-contain"
					/>
				</Link>
			) : (
				<NavbarAutocomplete isTablet={isTablet} />
			)}

			{/* autoComplete */}

			{/* buttons user*/}
			<div className="flex flex-grow basis-0 justify-end">
				<div className="flex justify-between items-center [&_a_button]:p-2 space-x-2">
					{/* checkout */}
					{/* <Link className="hidden sm:block" href="/checkout">
						<Button variant="ghost">
							<TruckIcon className="text-picker-4" />
						</Button>
					</Link> */}
					{!isTablet && <NavbarAutocomplete isTablet={isTablet} />}

					{/* favorites */}
					{/* <Link href="/favorites" onClick={() => setLastRoute('/favorites')}> */}
					<Link className="hidden sm:block" href="/favorites">
						<Button variant="ghost">
							<HeartIcon className="text-picker-4 size-5" />
						</Button>
					</Link>

					{/* user */}
					{isTablet ? (
						<>
							{!session ? (
								<ButtonGeneral
									href="/login"
									variant="ghost"
									className="*:flex *:gap-1 hidden sm:inline-flex"
								>
									<User className="text-picker-4 size-5" />
									<span className="text-base hidden lg:block">
										Iniciar Sesión
									</span>
								</ButtonGeneral>
							) : (
								<NavbarUser session={session} />
							)}
						</>
					) : null}

					{/* cart */}
					<CartShopping />
				</div>
			</div>
		</div>
	)
}
