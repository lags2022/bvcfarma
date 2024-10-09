import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { logoutAction } from '@/actions/auth-action'
import { SIDEBAR_ITEMS } from '@/constants/dashboard'
import { LOGO, NAME } from '@/constants/general'
import { cn } from '@/lib/utils'

import { SidebarItem } from '../sidebar/SidebarItem'
export const Sidebar = ({
	isExpanded,
	toggleSidebar,
}: {
	isExpanded: boolean
	toggleSidebar: () => void
}) => {
	return (
		<div
			className={cn(
				'bg-light dark:bg-dark transition-[width] ease duration-300 z-50 h-screen flex flex-col border-r',
				isExpanded ? 'w-56' : 'w-[72px]',
			)}
		>
			<Link href="/" className="flex items-center gap-1 p-4">
				{/* <Package2Icon className="h-8 w-8 flex-shrink-0" /> */}
				<Image
					src={LOGO}
					alt="Logo"
					width={384}
					height={321}
					className="aspect-[384/321] ml-1 w-9 object-contain"
				/>
				<Image
					src={NAME}
					alt="Logo"
					width={750}
					height={114}
					className={cn(
						'aspect-[750/114] w-28 md:w-32 object-contain',
						isExpanded ? '' : 'scale-0',
					)}
				/>
			</Link>
			<div className="flex-1 overflow-y-auto">
				<nav className="flex flex-col gap-2 p-2">
					{SIDEBAR_ITEMS.map((item) => (
						<SidebarItem
							key={item.label}
							icon={item.icon}
							label={item.label}
							badge={item.badge}
							isExpanded={isExpanded}
							href={item.href}
							onClick={() => isExpanded && toggleSidebar()}
						/>
					))}
				</nav>
			</div>
			<div className="py-4 px-2">
				<SidebarItem
					icon={<LogOut />}
					label="Cerrar sesión"
					isExpanded={isExpanded}
					onClick={async () => {
						await logoutAction()
					}}
				/>
			</div>
		</div>
	)
}
