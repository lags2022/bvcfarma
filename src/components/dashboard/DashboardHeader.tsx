import { ChevronLeft, ChevronRight } from 'lucide-react'

import { AVATAR_FALLBACK } from '@/constants/general'
import { cn } from '@/lib/utils'

import { ThemeSwitch } from '../shared/ThemeSwitch'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const DashboardMain = ({
	toggleSidebar,
	isExpanded,
	nameSidebar,
	children,
}: {
	toggleSidebar: () => void
	isExpanded: boolean
	nameSidebar?: string
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
				<div className="flex items-center justify-between pr-4 py-3">
					<div className="flex items-center justify-center gap-1">
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleSidebar}
							className="flex-shrink-0"
						>
							{isExpanded ? (
								<ChevronLeft className="size-4" />
							) : (
								<ChevronRight className="size-4" />
							)}
						</Button>
						<h1 className="text-2xl font-semibold">{nameSidebar}</h1>
					</div>

					<div className="flex items-center space-x-4">
						{/* <form>
							<Input
								type="search"
								placeholder="Search orders..."
								className="w-64"
							/>
						</form> */}
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
