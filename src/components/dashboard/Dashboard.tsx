'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { SIDEBAR_ITEMS } from '@/constants/dashboard'

import { DashboardMain } from './DashboardHeader'
import { Sidebar } from '../sidebar/Sidebar'

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
		<div className="flex bg-light dark:bg-dark">
			{/* Sidebar */}
			{/* <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} /> */}
			<Sidebar isExpanded={isExpanded} />

			{/* Main content */}
			<DashboardMain
				isExpanded={isExpanded}
				nameSidebar={nameSidebar}
				toggleSidebar={toggleSidebar}
			>
				{children}
			</DashboardMain>
		</div>
	)
}
