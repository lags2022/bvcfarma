'use client'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DropdownArrow } from '@/components/svg/DropdownArrow'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
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
				className="top-0 right-0 w-screen !h-full rounded-none mt-0 py-2 px-2 bg-white text-base"
			>
				<div className="overflow-x-hidden">
					<div className="flex items-center justify-between h-10 px-2">
						<div className="text-base flex items-center gap-1">
							{slideInCategories ? (
								<Button
									variant="ghost"
									size="icon"
									onClick={handleArrowLeft}
									className="hover:bg-transparent"
								>
									<ArrowLeft className="size-4" />
								</Button>
							) : null}
							<p
								className={cn(
									'capitalize font-medium',
									!slideInCategories && 'pl-4',
								)}
							>
								{(slideInSubCategories && dataSubMenuCategory.name) ||
									(slideInCategories && dataMenuCategory.name) ||
									'categorías'}
							</p>
						</div>
					</div>

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
								<div
									key={item.id}
									className="px-6 py-2 flex items-center justify-between cursor-pointer"
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
							))}
						</div>

						{/* categorias */}
						<div className="w-[100%]">
							{category?.items.map((item) => (
								<div
									key={item.id}
									className="px-6 py-2 flex items-center justify-between cursor-pointer"
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
							))}
						</div>

						{/* subCategories */}
						<div className="w-[100%]">
							{subCategory?.items?.map((item) => (
								<div
									key={item.id}
									className="px-6 py-2 flex items-center justify-between cursor-pointer"
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
			</SheetContent>
		</Sheet>
	)
}
