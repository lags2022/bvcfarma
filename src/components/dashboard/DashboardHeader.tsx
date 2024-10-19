import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { AVATAR_FALLBACK, LOGO, LOGO_NAME } from '@/constants/general'
import { cn } from '@/lib/utils'

import { ThemeSwitch } from '../shared/ThemeSwitch'
import { SiderbarMenuBar } from '../sidebar/SiderbarMenuBar'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const DashboardMain = ({
	toggleSidebar,
	isExpanded,
	children,
}: {
	toggleSidebar: () => void
	isExpanded: boolean
	children: React.ReactNode
}) => {
	return (
		<div
			className={cn(
				'flex-1 overflow-x-hidden overflow-y-auto',
				// isExpanded && 'pl-0',
			)}
		>
			<header className="bg-light dark:bg-dark">
				<div className="flex items-center justify-between px-4 lg:pl-0 lg:pr-4 py-3">
					<div className="flex items-center justify-center gap-x-6 lg:gap-x-0">
						<SiderbarMenuBar />
						<Link href="/">
							<Image
								src={LOGO}
								alt="Logo"
								width={384}
								height={321}
								className="aspect-[384/321] w-9 object-contain block sm:hidden"
							/>
							<Image
								src={LOGO_NAME}
								alt="Logo"
								width={946}
								height={264}
								className="aspect-[946/264] w-28 h-9 hidden sm:block lg:hidden object-contain"
							/>
						</Link>
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleSidebar}
							className="hidden lg:flex flex-shrink-0"
						>
							{isExpanded ? (
								<ChevronLeft className="size-4" />
							) : (
								<ChevronRight className="size-4" />
							)}
						</Button>
					</div>

					<div className="flex items-center space-x-4">
						<form>
							<Input
								type="search"
								placeholder="Search orders..."
								className="max-w-36 sm:max-w-64"
							/>
						</form>
						<ThemeSwitch />
						<Avatar>
							<AvatarImage src={AVATAR_FALLBACK} alt="User" />
							<AvatarFallback>U</AvatarFallback>
						</Avatar>
					</div>
				</div>
			</header>

			<main className="bg-light dark:bg-dark">{children}</main>
		</div>
	)
}
