'use client'

import { Session } from 'next-auth'
import { useState } from 'react'

import { DashboardHeader } from './DashboardHeader'
import { Sidebar } from '../sidebar/Sidebar'

export const Dashboard = ({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session
}) => {
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
			<DashboardHeader
				session={session}
				isExpanded={isExpanded}
				toggleSidebar={toggleSidebar}
			>
				{children}
			</DashboardHeader>
		</div>
	)
}
