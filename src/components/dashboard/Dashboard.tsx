'use client'

import { Session } from 'next-auth'
import { useState } from 'react'

import { TransitionPageProvider } from '@/providers/TransitionPageProvider'

import { Dashboard } from './DashboardHeader'
import { Sidebar } from '../sidebar/Sidebar'

export const DashboardProvider = ({
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
			<Dashboard
				session={session}
				isExpanded={isExpanded}
				toggleSidebar={toggleSidebar}
			>
				<TransitionPageProvider>{children}</TransitionPageProvider>
			</Dashboard>
		</div>
	)
}
