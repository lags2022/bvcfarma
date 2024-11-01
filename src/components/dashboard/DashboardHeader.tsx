import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Session } from 'next-auth'

import { logoutAction } from '@/actions/auth-action'
import { LOGO, LOGO_NAME } from '@/constants/general'
import { NAVBAR_ITEMS_DASHBOARD } from '@/constants/navbar-link'
import { cn } from '@/lib/utils'

import { NavbarUserContent } from '../shared/NavbarUserContent'
import { ThemeSwitch } from '../shared/ThemeSwitch'
import { SiderbarMenuBar } from '../sidebar/SiderbarMenuBar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
export const Dashboard = ({
	toggleSidebar,
	isExpanded,
	children,
	session,
}: {
	toggleSidebar: () => void
	isExpanded: boolean
	children: React.ReactNode
	session: Session
}) => {
	const handleLogout = () => {
		logoutAction()
	}

	return (
		<div
			className={cn(
				'flex-1 overflow-x-hidden overflow-y-auto',
				isExpanded ? 'lg:ml-56' : 'lg:ml-[72px]',
			)}
		>
			<header
				className={cn(
					// 'fixed w-full z-50 top-0 border-picker-5/40 bg-white/80 dark:bg-dark/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-dark/60',
          "fixed top-0 z-50 w-full border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
					isExpanded ? 'lg:w-[calc(100%-224px)]' : 'lg:w-[calc(100%-72px)]',
				)}

			>
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

					<div className="flex items-center space-x-1">
						<form className='mr-2'>
							<Input
								type="search"
								placeholder="Search orders..."
								className="max-w-36 sm:max-w-64"
							/>
						</form>
						<ThemeSwitch />
						<NavbarUserContent
							session={session}
							navbarItems={NAVBAR_ITEMS_DASHBOARD}
							pathname={'/dashboard'}
							handleLogout={handleLogout}
							isPageDashboard
						/>
					</div>
				</div>
			</header>

			<main className="mt-16 min-h-[calc(100lvh-64px)] bg-light dark:bg-dark p-4 sm:px-6">
				{children}
			</main>
		</div>
	)
}
