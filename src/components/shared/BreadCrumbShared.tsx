'use client'

import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

export const BreadCrumbShared = ({
	breadcrumbItems,
}: {
	breadcrumbItems: { href?: string; label: string }[]
}) => {
	breadcrumbItems = [{ href: '/', label: 'home' }, ...breadcrumbItems]

	const ITEMS_TO_DISPLAY =
		breadcrumbItems.length === 2 ? 2 : breadcrumbItems.length === 3 ? 3 : 4
	const pathname = usePathname()
	const isTablet = useMediaQuery('(min-width: 640px)')

	return (
		<Breadcrumb className='contain'>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink
						className="hover:underline text-gray-500 hover:text-gray-500"
						href={breadcrumbItems[0].href}
					>
						{breadcrumbItems[0].label === 'home' ? (
							<HomeIcon className="size-4" />
						) : (
							breadcrumbItems[0].label
						)}
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{breadcrumbItems.length > ITEMS_TO_DISPLAY ? (
					<>
						<BreadcrumbItem>
							{isTablet ? (
								<DropdownMenu>
									<DropdownMenuTrigger
										className="flex items-center gap-1"
										aria-label="Toggle menu"
									>
										<BreadcrumbEllipsis className="h-4 w-4" />
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										{breadcrumbItems
											.slice(1, -ITEMS_TO_DISPLAY + 1)
											.map((item, index) => (
												<DropdownMenuItem key={index}>
													<Link href={item.href ? item.href : '#'}>
														{item.label}
													</Link>
												</DropdownMenuItem>
											))}
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Drawer>
									<DrawerTrigger aria-label="Toggle Menu">
										<BreadcrumbEllipsis className="h-4 w-4" />
									</DrawerTrigger>
									<DrawerContent>
										<DrawerHeader className="text-left">
											<DrawerTitle>Navigate to</DrawerTitle>
											<DrawerDescription>
												Select a page to navigate to.
											</DrawerDescription>
										</DrawerHeader>
										<div className="grid gap-1 px-4">
											{breadcrumbItems.slice(1, -2).map((item, index) => (
												<Link
													key={index}
													href={item.href ? item.href : '#'}
													className="py-1 text-sm"
												>
													{item.label}
												</Link>
											))}
										</div>
										<DrawerFooter className="pt-4">
											<DrawerClose asChild>
												<Button variant="outline">Close</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
							)}
						</BreadcrumbItem>
						<BreadcrumbSeparator />
					</>
				) : null}
				{breadcrumbItems.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
					<>
						<BreadcrumbItem key={index}>
							{item.href ? (
								<>
									<BreadcrumbLink
										asChild
										className={cn(
											'max-w-20 truncate md:max-w-none hover:underline text-gray-500 hover:text-gray-500',
											pathname === item.href
												? 'text-picker-4 font-bold hover:text-picker-4'
												: '',
										)}
									>
										<Link href={item.href}>{item.label}</Link>
									</BreadcrumbLink>
								</>
							) : (
								<BreadcrumbPage className="max-w-24 truncate md:max-w-none">
									{item.label}
								</BreadcrumbPage>
							)}
						</BreadcrumbItem>
						{breadcrumbItems.slice(-ITEMS_TO_DISPLAY + 1).length - 1 !==
						index ? (
							<BreadcrumbSeparator className="text-gray-500" />
						) : null}
					</>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
