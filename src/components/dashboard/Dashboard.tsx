'use client'

import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SIDEBAR_ITEMS } from '@/constants/dashboard'

import { ThemeSwitch } from '../shared/ThemeSwitch'
import { SidebarItem } from '../sidebar/SidebarItem'
import { Package2Icon } from '../svg/Package'

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const pathname = usePathname()

	const nameSidebar = SIDEBAR_ITEMS.find(
		(item) => item.href === pathname,
	)?.label

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className="flex h-screen bg-light dark:bg-dark">
			{/* Sidebar */}
			<div
				className={`bg-light dark:bg-dark transition-[width] ease duration-300 flex flex-col border-r ${isExpanded ? 'w-56' : 'w-[72px]'} `}
			>
				<div className="flex items-center justify-between p-4">
					<div className="flex items-center ml-1">
						<Package2Icon className="h-8 w-8 flex-shrink-0" />
						<span
							className={`ml-2 text-xl font-semibold whitespace-nowrap ${isExpanded ? '' : 'scale-0'} transition-[scale] duration-100`}
						>
							Shop
						</span>
					</div>
				</div>
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
							/>
						))}
					</nav>
				</div>
				<div className="py-4 px-2">
					<SidebarItem
						icon={<LogOut />}
						label="Cerrar sesión"
						isExpanded={isExpanded}
					/>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 overflow-x-hidden overflow-y-auto">
				<header className="bg-light dark:bg-dark shadow-sm">
					<div className="flex items-center justify-between pr-4 py-3">
						<div className="flex items-center justify-center gap-1">
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleSidebar}
								className="flex-shrink-0"
							>
								{isExpanded ? (
									<ChevronLeft className="h-4 w-4" />
								) : (
									<ChevronRight className="h-4 w-4" />
								)}
							</Button>
							<h1 className="text-2xl font-semibold">{nameSidebar}</h1>
						</div>
						<div className="flex items-center space-x-4">
							<form>
								<Input
									type="search"
									placeholder="Search orders..."
									className="w-64"
								/>
							</form>
							<ThemeSwitch />
							<Avatar>
								<AvatarImage src="/placeholder-user.jpg" alt="User" />
								<AvatarFallback>U</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</header>

				<main className="bg-light dark:bg-dark rounded-lg shadow">
					{children}
				</main>
			</div>
		</div>
	)
}
