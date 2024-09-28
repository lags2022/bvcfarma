'use client'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DropdownArrow } from '@/components/svg/DropdownArrow'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { multilevelNavbar } from '@/helpers/multilevel-navbar'
import { MultiLevel } from '@/interfaces/navbar'
import { cn } from '@/lib/utils'
import { getCategoriesData } from '@/services/getProducts'

export const NavbarMenuBarCategories = () => {
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
		if (subCategory) {
			setSlideInSubCategories(false)
			setDataSubMenuCategory({
				id: 0,
				name: '',
			})
		} else if (category) {
			setSlideInCategories(false)
			setDataMenuCategory({
				id: 0,
				name: '',
			})
		}
	}

	return (
		<Drawer direction="left" open={open} onOpenChange={setOpen}>
			<DrawerTrigger className="text-picker-4 hover:text-picker-4">
				<Menu />
			</DrawerTrigger>
			<DrawerContent className="top-0 right-0 w-screen max-w-80 !h-full rounded-none mt-0 first:*:hidden bg-white text-base">
				<div className="overflow-x-hidden">
					<DrawerHeader className="flex items-center justify-between py-1 px-2">
						<DrawerTitle className="text-base flex items-center gap-1">
							{dataMenuCategory.id ? (
								<Button
									variant="ghost"
									size="icon"
									onClick={handleArrowLeft}
									className="hover:bg-transparent"
								>
									<ArrowLeft className="size-4" />
								</Button>
							) : null}
							<p className={cn('capitalize', !slideInCategories && 'pl-4')}>
								{dataSubMenuCategory.name ||
									dataMenuCategory.name ||
									'categorías'}
							</p>
							<DrawerDescription></DrawerDescription>
						</DrawerTitle>
						<DrawerClose>
							<Button
								variant="ghost"
								className="hover:bg-transparent"
								size="icon"
								onClick={handleClose}
							>
								<X className="size-4" />
								<span className="sr-only">Cerrar</span>
							</Button>
						</DrawerClose>
					</DrawerHeader>
					<hr />

					<div
						className={cn(
							'flex w-[300%] transform duration-700 ease',
							slideInCategories && '-translate-x-1/3',
							slideInSubCategories && '-translate-x-2/3',
						)}
					>
						{/* tipos */}
						<div className="w-[100%]">
							{multilevel.map((item) => (
								<div key={item.id}>
									<div
										className="px-6 py-3 flex items-center justify-between cursor-pointer"
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
											<DropdownArrow className="-rotate-90" />
										)}
									</div>
									<hr />
								</div>
							))}
						</div>

						{/* categorias */}
						<div className="w-[100%]">
							{category?.items.map((item) => (
								<>
									<div
										key={item.id}
										className="px-6 py-3 flex items-center justify-between cursor-pointer"
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
											<DropdownArrow className="-rotate-90" />
										)}
									</div>
									<hr />
								</>
							))}
						</div>

						{/* subCategories */}
						<div className="w-[100%]">
							{subCategory?.items?.map((item) => (
								<>
									<div
										key={item.id}
										className="px-6 py-3 flex items-center justify-between cursor-pointer"
										onClick={() => {
											router.push(
												`/products?tipos=${category?.id}&categories=${subCategory?.id}&subCategories=${item.id}`,
											)
											setOpen(false)
										}}
									>
										<p className="capitalize font-medium">{item.name}</p>
									</div>
									<hr />
								</>
							))}
						</div>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	)
}
