'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { multilevelNavbar } from '@/helpers/multilevel-navbar'
import {
	CategoryApi,
	SubCategoryApi,
	SubSubCategoryApi,
} from '@/interfaces/general'
import { MultiLevel } from '@/interfaces/navbar'
import { cn } from '@/lib/utils'

import { UnderlineAnimation } from '../shared/UnderlineAnimation'
import { DropdownArrow } from '../svg/DropdownArrow'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'

export const NavbarBottonSeccion = ({
	tipos,
	categories,
	subCategories,
}: {
	tipos: CategoryApi[]
	categories: SubCategoryApi[]
	subCategories: SubSubCategoryApi[]
}) => {
	const multilevel = multilevelNavbar({
		tipos,
		categories,
		subCategories,
	})

	const [activeMenus, setActiveMenus] = useState<any>({})
	const [isClose, setIsClose] = useState(false)

	const handleSelect = (level: string, item: any) => {
		setActiveMenus((prevState: any) => ({
			...prevState,
			[level]: item,
			...Object.keys(prevState)
				.filter((key) => key > level)
				.reduce((acc, key) => ({ ...acc, [key]: null }), {}),
		}))
	}

	const handleMouseLeave = () => setActiveMenus({})

	const renderSubMenu = (items: MultiLevel['items'], level: string) => {
		const num = parseInt(level.replace('level', ''))

		if (!items.length) return null

		return (
			<div
				style={{
					transform: `translateX(${(num - 2) * 100}%) translateY(40px)`,
				}}
				className={cn(
					'menu-categories bg-white border absolute top-0 left-[157%] min-w-52 h-[200px] overflow-y-scroll z-10',
					activeMenus[`level${num + 1}`] ? 'rounded-none' : 'rounded-br-md',
				)}
			>
				{items.map((subItem) => {
					// let href = `/products?${subItem.type}=${subItem.id}`
					let query = {}

					if (subItem.type === 'categories') {
						query = {
							tipos: subItem.idCategory,
							categories: subItem.id,
						}
						// href = `/products?tipos=${subItem.idCategory}&${subItem.type}=${subItem.id}`
					}

					if (subItem.type === 'subCategories') {
						query = {
							tipos: subItem.idCategory,
							categories: subItem.idSubCategory,
							subCategories: subItem.id,
						}
						// href = `/products?tipos=${subItem.idCategory}&categories=${subItem.idSubCategory}&${subItem.type}=${subItem.id}`
					}

					return (
						<Link
							key={subItem.id}
							className="px-4 py-2 hover:bg-gray-100 transition-[background] ease-in-out cursor-pointer flex items-center justify-between gap-1 group/item text-base capitalize font-medium"
							onMouseEnter={() => handleSelect(`level${num + 1}`, subItem)}
							href={{
								pathname: '/products',
								query,
							}}
							onClick={() => handleMouseLeave()}
						>
							{subItem.name}

							{subItem.items && subItem.items.length > 0 && (
								<DropdownArrow className="fill-gray-400 group-hover/item:fill-current -rotate-90" />
							)}
						</Link>
					)
				})}
			</div>
		)
	}

	return (
		<nav className="contain flex gap-2 px-0 lg:px-6">
			{/* seccion categorias menu multinivel */}
			<div
				className="group hidden sm:inline-block relative"
				onMouseLeave={handleMouseLeave}
				onMouseEnter={() => setIsClose(false)}
			>
				<Button className="relative h-10" variant="ghost">
					<div className="flex justify-center items-center gap-1">
						<span className='text-base'>Categorías</span>
						<DropdownArrow className="group-hover:-rotate-180" />
					</div>
					<UnderlineAnimation className="bg-picker-3" />
				</Button>
				{/* Nivel 1 */}
				<div
					className={cn(
						'menu-categories bg-white border opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 absolute transition-[opacity,transform] ease-in-out origin-top h-[200px] min-w-52 overflow-y-scroll z-10',
						activeMenus['level1'] ? 'rounded-bl-md' : 'rounded-b-md',
						isClose && 'hidden',
					)}
				>
					{multilevel.map((item) => (
						<Link
							key={item.id}
							className="px-4 py-2 hover:bg-gray-100 transition-[background] ease-in-out cursor-pointer flex items-center justify-between gap-1 group/item capitalize font-medium"
							href={`/products?${item.type}=${item.id}`}
							onMouseEnter={() => handleSelect('level1', item)}
							onClick={() => {
								handleMouseLeave()
								setIsClose(true)
							}}
						>
							{item.name}

							{item.items && item.items.length > 0 && (
								<DropdownArrow className="fill-gray-400 group-hover/item:fill-current -rotate-90" />
							)}

							{/* safe triangle */}
							{/* {parent.current && (
							<SafeArea anchor={parent.current} submenu={child.current} />
						)} */}
						</Link>
					))}
				</div>

				{/* Submenús dinámicos */}
				{Object.keys(activeMenus).map((level, index) => {
					const nextLevel = `level${index + 2}`
					const items = activeMenus[level]?.items
					return items && renderSubMenu(items, nextLevel)
				})}
			</div>

			<ScrollArea className="w-full">
				<div className="flex items-end gap-4">
					{/* seccion categorias principales */}
					{multilevel.map((item) => (
						<Link
							key={item.id}
							className="relative group hover:bg-gray-100 transition-[background] ease-in-out cursor-pointer p-2 rounded-t-md flex items-center justify-center"
							href={`/products?${item.type}=${item.id}`}
						>
							<div className="flex justify-center items-center gap-1">
								<span>
									{item.icon.startsWith('U')
										? String.fromCodePoint(
												parseInt(item.icon.replace('U+', '0x')),
											)
										: item.icon}
								</span>
								<span className="capitalize font-medium whitespace-nowrap">
									{item.name}
								</span>
							</div>
							<UnderlineAnimation className={item.color} />
						</Link>
					))}
				</div>
				<ScrollBar orientation="horizontal" className="hidden" />
			</ScrollArea>
		</nav>
	)
}
