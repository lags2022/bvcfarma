import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { LOGO_NAME } from '@/constants/general'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { SidebarContent } from './SidebarContent'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

export const SiderbarMenuBar = () => {
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 1024px)')

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		if (isDesktop) {
			handleClose()
		}
	}, [isDesktop])

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="block lg:hidden text-picker-4 hover:text-picker-4">
				<Menu className="size-6" />
			</SheetTrigger>
			<SheetContent
				side="left"
				className="h-dvh flex lg:hidden flex-col justify-between rounded-none mt-0 py-0 pt-3 px-0 text-base"
			>
				<ScrollArea className="w-full h-full [&>div>div]:h-full">
					{/* logo de la empresa */}
					<Link href="/" className="w-fit">
						<Image
							src={LOGO_NAME}
							alt="Logo"
							width={145}
							height={32}
							className="aspect-[145/32] h-8 object-contain"
						/>
					</Link>

					{/* Content of the sidebar */}
					<div className="h-[calc(100%-32px)] flex flex-col pt-2 justify-between">
						<SidebarContent handleClose={handleClose} />
					</div>

					<ScrollBar orientation="vertical" />
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
