'use client'

import { useState } from 'react'

import { DashboardMain } from './DashboardHeader'
import { Sidebar } from '../sidebar/Sidebar'

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
	const [isExpanded, setIsExpanded] = useState(true)

	const toggleSidebar = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className="flex bg-light dark:bg-dark">
			{/* Sidebar */}
			{/* <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} /> */}
			<Sidebar isExpanded={isExpanded} />

			{/* Main content */}
			<DashboardMain isExpanded={isExpanded} toggleSidebar={toggleSidebar}>
				{children}
			</DashboardMain>
		</div>
	)
}
