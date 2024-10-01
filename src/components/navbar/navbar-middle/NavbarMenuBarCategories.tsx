'use client'

import {
	ArrowLeft,
	Heart,
	LogOut,
	Menu,
	Settings,
	ShoppingBag,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

import { logoutAction } from '@/actions/auth-action'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Social } from '@/components/social/Social'
import { DropdownArrow } from '@/components/svg/DropdownArrow'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { URL_PORTFOLIO } from '@/constants/general'
import { multilevelNavbar } from '@/helpers/multilevel-navbar'
import { MultiLevel } from '@/interfaces/navbar'
import { cn } from '@/lib/utils'
import { getCategoriesData } from '@/services/getProducts'

export const NavbarMenuBarCategories = ({
	session,
}: {
	session: Session | null
}) => {
	const router = useRouter()
	const [multilevel, setMultilevel] = useState<MultiLevel[]>([])
	const [slideInCategories, setSlideInCategories] = useState(false)
	const [slideInSubCategories, setSlideInSubCategories] = useState(false)
	const [dataMenuCategory, setDataMenuCategory] = useState({
		id: 0,
		name: '',
	})
	const [dataSubMenuCategory, setDataSubMenuCategory] = useState({
		id: 0,
		name: '',
	})
	const category = multilevel.find((item) => item.id === dataMenuCategory.id)
	const subCategory = category?.items.find(
		(item) => item.id === dataSubMenuCategory.id,
	)

	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const fetchCategories = async () => {
			const { tipos, categories, subCategories } = await getCategoriesData()
			setMultilevel(
				multilevelNavbar({
					tipos,
					categories,
					subCategories,
				}),
			)
		}

		if (multilevel.length === 0) fetchCategories()

		handleClose()
	}, [open])

	const handleClose = () => {
		setSlideInCategories(false)
		setDataMenuCategory({
			id: 0,
			name: '',
		})
		setSlideInSubCategories(false)
		setDataSubMenuCategory({
			id: 0,
			name: '',
		})
	}

	const handleArrowLeft = () => {
		if (slideInSubCategories) {
			setSlideInSubCategories(false)
		} else if (slideInCategories) {
			setSlideInCategories(false)
		}
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="text-picker-4 hover:text-picker-4">
				<Menu className="size-5" />
			</SheetTrigger>
			<SheetContent
				side="left"
				className="w-screen h-full flex flex-col justify-between rounded-none mt-0 py-2 px-0 bg-white text-base"
			>
				<ScrollArea className="w-screen">
					<section className="w-screen">
						{/* titulo */}
						<div className="flex items-center justify-between h-10 px-6">
							<div className="text-base flex items-center gap-3">
								{slideInCategories ? (
									<Button
										variant="ghost"
										onClick={handleArrowLeft}
										className="hover:bg-transparent px-0"
									>
										<ArrowLeft className="text-gray-500 size-4" />
									</Button>
								) : null}
								<p
									className={cn(
										'capitalize font-medium',
										!slideInCategories && 'pl-7',
									)}
								>
									{(slideInSubCategories && dataSubMenuCategory.name) ||
										(slideInCategories && dataMenuCategory.name) ||
										'categorías'}
								</p>
							</div>
						</div>

						{/* multilevel */}
						<div
							className={cn(
								'flex w-[300vw] transform duration-700 ease',
								slideInCategories && '-translate-x-1/3',
								slideInSubCategories && '-translate-x-2/3',
							)}
						>
							{/* tipos */}
							<div className="w-screen">
								<div className="px-4 pl-5">
									{multilevel.map((item) => (
										<div
											key={item.id}
											className="p-2 flex items-center justify-between cursor-pointer"
											onDoubleClick={() => {
												router.push(`/products?tipos=${item?.id}`)
												setOpen(false)
											}}
											onClick={() => {
												if (item.items.length > 0) {
													setSlideInCategories(true)
													setDataMenuCategory({
														id: item.id,
														name: item.name,
													})
												}
											}}
										>
											<div className="flex items-center gap-2">
												<p className="text-sm text-muted-foreground">
													{item.icon.startsWith('U')
														? String.fromCodePoint(
																parseInt(item.icon.replace('U+', '0x')),
															)
														: item.icon}
												</p>
												<p className="font-medium capitalize">{item.name}</p>
											</div>
											{item.items.length > 0 && (
												<DropdownArrow className="text-gray-500 -rotate-90" />
											)}
										</div>
									))}
								</div>
							</div>

							{/* categorias */}
							<div className="w-screen">
								<div className="px-4 pl-5">
									{category?.items.map((item) => (
										<div
											key={item.id}
											className="p-2 flex items-center justify-between cursor-pointer"
											onDoubleClick={() => {
												router.push(
													`/products?tipos=${category?.id}&categories=${item?.id}`,
												)
												setOpen(false)
											}}
											onClick={() => {
												if (item?.items && item?.items?.length > 0) {
													setSlideInSubCategories(true)
													setDataSubMenuCategory({
														id: item.id,
														name: item.name,
													})
												}
											}}
										>
											<p className="capitalize font-medium">{item.name}</p>
											{item?.items && item?.items?.length > 0 && (
												<DropdownArrow className="text-gray-500 -rotate-90" />
											)}
										</div>
									))}
								</div>
							</div>

							{/* subCategories */}
							<div className="w-screen">
								<div className="px-4 pl-5">
									{subCategory?.items?.map((item) => (
										<div
											key={item.id}
											className="p-2 flex items-center justify-between cursor-pointer"
											onClick={() => {
												router.push(
													`/products?tipos=${category?.id}&categories=${subCategory?.id}&subCategories=${item.id}`,
												)
												setOpen(false)
											}}
										>
											<p className="capitalize font-medium">{item.name}</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>
					<ScrollBar orientation="vertical" />
				</ScrollArea>

				<section className="px-4">
					<div className="border-t h-1 border-gray-200" />

					{!session ? (
						<div className="flex flex-col items-center justify-center gap-2 py-4">
							<ButtonGeneral
								className="w-full"
								href="/login"
								onClick={() => setOpen(false)}
							>
								Registrarse
							</ButtonGeneral>
							<ButtonGeneral
								variant="secondary"
								className="w-full *:w-full hover:*:bg-gray-50"
								href="/login"
								onClick={() => setOpen(false)}
							>
								Iniciar Sesión
							</ButtonGeneral>
						</div>
					) : (
						<nav className="flex flex-col items-center [&>a>button]:gap-2 [&>a>button]:justify-start w-full [&>a]:w-full [&>a>button]:w-full [&>a>button]:text-base py-1 pb-2 [&>a>button]:rounded-sm text-gray-500 hover:text-gray-500">
							<div className="w-full pl-4 pr-1 py-2 flex items-center justify-between font-semibold text-base text-black">
								{session?.user?.name || session?.user?.email}
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
							</div>
							<ButtonGeneral
								variant="ghost"
								href="/favorites"
								onClick={() => setOpen(false)}
								className={cn(
									'group hover:text-black',
									pathname === '/favorites' &&
										'bg-accent text-black hover:text-black',
								)}
							>
								<Heart
									className={cn(
										'group-hover:text-black text-gray-500 size-5',
										pathname === '/favorites' && 'text-black',
									)}
								/>
								Favoritos
							</ButtonGeneral>
							<ButtonGeneral
								variant="ghost"
								href="/orders"
								onClick={() => setOpen(false)}
								className={cn(
									'group hover:text-black',
									pathname === '/orders' &&
										'bg-accent text-black hover:text-black',
								)}
							>
								<ShoppingBag
									className={cn(
										'group-hover:text-black text-gray-500 size-5',
										pathname === '/orders' && 'text-black',
									)}
								/>
								Órdenes
							</ButtonGeneral>
							<ButtonGeneral
								variant="ghost"
								href="/profile"
								onClick={() => setOpen(false)}
								className={cn(
									'group hover:text-black',
									pathname === '/profile' &&
										'bg-accent text-black hover:text-black',
								)}
							>
								<Settings
									className={cn(
										'group-hover:text-black text-gray-500 size-5',
										pathname === '/profile' && 'text-black',
									)}
								/>
								Ajustes
							</ButtonGeneral>
							<Button
								variant="ghost"
								onClick={() => {
									setOpen(false)
									logoutAction()
								}}
								className="w-full flex group hover:text-black items-center justify-start gap-2 text-gray-500  text-base mt-1"
							>
								<LogOut className="group-hover:text-black text-gray-500 size-5" />
								Cerrar sesión
							</Button>
						</nav>
					)}

					<div className="border-t h-1 border-gray-200" />
					<div className="px-4 py-1 flex items-center justify-between">
						<Social />
						<div className="text-sm">
							Hecho por{' '}
							<a
								href={URL_PORTFOLIO}
								target="_blank"
								rel="noopener noreferrer"
								className="italic text-gray-500 hover:text-gray-600 hover:underline"
							>
								lgdev
							</a>
						</div>
					</div>
				</section>
			</SheetContent>
		</Sheet>
	)
}
