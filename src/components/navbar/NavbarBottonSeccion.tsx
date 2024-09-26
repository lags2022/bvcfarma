'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FilterTypes } from '@/context/useFilterStore'
import {
	CategoryApi,
	SubCategoryApi,
	SubSubCategoryApi,
} from '@/interfaces/general'
import { cn } from '@/lib/utils'

import { UnderlineAnimation } from '../shared/UnderlineAnimation'
import { DropdownArrow } from '../svg/DropdownArrow'

const ICON_MULTILEVEL_NAVBAR_CATEGORIA = {
	medicamentos: { icon: '💊', color: 'bg-red-500' },
	suplementos: { icon: '🏥', color: 'bg-green-500' },
	'cuidado personal': { icon: '👧', color: 'bg-pink-500' },
} as {
	[key: string]: { icon: string; color: string }
}

interface MultiLevelProps {
	id: number
	type: FilterTypes
	name: string
	idCategory?: string
	idSubCategory?: string
}

interface MultiLevel extends MultiLevelProps {
	icon: any
	color: any
	items: (MultiLevelProps &
		Partial<{
			items: MultiLevelProps[]
		}>)[]
}

export const NavbarBottonSeccion = ({
	categories,
	subcategories,
	subsubcategories,
}: {
	categories: CategoryApi[]
	subcategories: SubCategoryApi[]
	subsubcategories: SubSubCategoryApi[]
}) => {
	const MULTILEVEL_NAVBAR: MultiLevel[] = categories.map((item) => ({
		id: item.id,
		type: 'tipos',
		name: item.name,
		icon: ICON_MULTILEVEL_NAVBAR_CATEGORIA[item.name].icon,
		color: ICON_MULTILEVEL_NAVBAR_CATEGORIA[item.name].color,
		items: subcategories
			.filter((subItem) => parseInt(subItem.idCategory) === item.id)
			.map((subItem) => ({
				id: subItem.id,
				idCategory: subItem.idCategory,
				type: 'categories',
				name: subItem.name,
				items: subsubcategories
					.filter(
						(subSubItem) => parseInt(subSubItem.idSubCategory) === subItem.id,
					)
					.map((subSubItem) => ({
						id: subSubItem.id,
						idCategory: subItem.idCategory,
						idSubCategory: subSubItem.idSubCategory,
						type: 'subCategories',
						name: subSubItem.name,
					})),
			})),
	}))

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
					'menu-categories bg-white border absolute top-0 left-[150%] min-w-40 h-[225px] overflow-y-scroll z-10',
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
							className="px-3 py-1 hover:bg-gray-100 transition-[background] ease-in-out cursor-pointer flex items-center justify-between gap-1 group/item text-sm capitalize"
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
		<nav className="container mx-auto flex items-center gap-4">
			{/* seccion categorias menu multinivel */}
			<div
				className="group inline-block relative"
				onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsClose(false)}
			>
				<Button className="relative py-1 px-2" variant="ghost">
					<div className="flex justify-center items-center gap-1">
						<span className="text-sm">Categorías</span>
						<DropdownArrow className="group-hover:-rotate-180" />
					</div>
					<UnderlineAnimation className="bg-picker-3" />
				</Button>
				{/* Nivel 1 */}
				<div
					className={cn(
						'menu-categories bg-white border opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 absolute transition-[opacity,transform] ease-in-out origin-top h-[225px] min-w-40 overflow-y-scroll z-10',
						activeMenus['level1'] ? 'rounded-bl-md' : 'rounded-b-md',
						isClose && 'hidden',
					)}
				>
					{MULTILEVEL_NAVBAR.map((item) => (
						<Link
							key={item.id}
							className="px-3 py-1 hover:bg-gray-100 transition-[background] ease-in-out cursor-pointer flex items-center justify-between gap-1 group/item text-sm capitalize"
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

			{/* seccion categorias principales */}
			{MULTILEVEL_NAVBAR.map((item) => (
				<Link
					key={item.id}
					className="relative group hover:bg-gray-100 transition-[background] ease-in-out cursor-pointer p-2 rounded-t-md flex items-center justify-center"
					href={`/products?${item.type}=${item.id}`}
				>
					<div className="flex justify-center items-center gap-1">
						<span>{item.icon}</span>
						<span className="text-sm capitalize">{item.name}</span>
					</div>
					<UnderlineAnimation className={item.color} />
				</Link>
			))}
		</nav>
	)
}
