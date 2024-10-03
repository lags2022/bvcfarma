'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { SIDEBAR_ITEMS } from '@/constants/dashboard'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { DashboardMain } from './DashboardHeader'
import { Sidebar } from '../sidebar/Sidebar'

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
	const [isExpanded, setIsExpanded] = useState(true)
	const pathname = usePathname()
	const isTablet = useMediaQuery('(min-width: 768px)')

	const nameSidebar = SIDEBAR_ITEMS.find(
		(item) => item.href === pathname,
	)?.label

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded)
	}

	useEffect(() => {
		if (isTablet) {
			setIsExpanded(true)
		} else {
			setIsExpanded(false)
		}
	}, [isTablet])

	return (
		<div className="flex bg-light dark:bg-dark">
			{/* Sidebar */}
			<Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

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
