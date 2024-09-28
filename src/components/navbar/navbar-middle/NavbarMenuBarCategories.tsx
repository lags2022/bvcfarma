'use client'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DropdownArrow } from '@/components/svg/DropdownArrow'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { multilevelNavbar } from '@/helpers/multilevel-navbar'
import { MultiLevel } from '@/interfaces/navbar'
import { getCategoriesData } from '@/services/getProducts'

export const NavbarMenuBarCategories = () => {
	const [multilevel, setMultilevel] = useState<MultiLevel[]>([])

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

		fetchCategories()
	}, [])

	return (
		<Drawer direction="left">
			<DrawerTrigger className="text-picker-4 rounded-sm transition duration-300 ease hover:text-picker-4">
				<Menu className="" />
			</DrawerTrigger>
			<DrawerContent className="top-0 right-0 w-screen max-w-80 !h-full rounded-none mt-0 first:*:hidden bg-white text-sm">
				<DrawerHeader className="flex items-center justify-between py-1 pr-2">
					<DrawerTitle className="text-sm">
						<p>Menú</p>
					</DrawerTitle>
					{/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
					<DrawerClose>
						<Button variant="ghost" size="icon">
							<X className="size-4" />
							<span className="sr-only">Cerrar</span>
						</Button>
					</DrawerClose>
				</DrawerHeader>

				<div className="h-4 bg-gray-200" />

				<div>
					<div className="px-4 py-2">
						<div className="">
							<p className="font-semibold">Categorías</p>
						</div>
					</div>

					<hr/>

					{multilevel.map((item) => (
						<div key={item.id}>
							<div className="px-6 py-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<p className="text-sm text-muted-foreground">
											{' '}
											{item.icon.startsWith('U')
												? String.fromCodePoint(
														parseInt(item.icon.replace('U+', '0x')),
													)
												: item.icon}
										</p>
										<p className="font-medium capitalize">{item.name}</p>
									</div>
									<DropdownArrow className="-rotate-90" />
								</div>
							</div>

							<hr />

							{/* {item.items && item.items.length > 0 && (
								<div className="flex flex-col gap-2">
									{item.items.map((subItem) => (
										<div key={subItem.id}>
											<div className="p-4">
												<div className="">
													<p className="font-semibold">{subItem.name}</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)} */}
						</div>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
