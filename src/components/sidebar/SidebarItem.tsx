import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { ButtonGeneral } from '../button/ButtonGeneral'
import { Badge } from '../ui/badge'

export function SidebarItem({
	icon,
	label,
	isExpanded,
	badge,
	href,
	onClick,
}: {
	icon: React.ReactNode
	label: string
	isExpanded: boolean
	badge?: number
	href?: string
	onClick?: () => void
}) {
	const pathname = usePathname()

	return (
		<ButtonGeneral
			variant={pathname === href ? 'default' : 'ghost'}
			className="w-full [&>button]:w-full !flex justify-start [&>button]:!flex [&>button]:gap-2 gap-2 [&>button]:justify-start group"
			href={href}
			onClick={onClick}
		>
			<div className="shrink-0">{icon}</div>
			<div
				className={cn(
					'w-full flex items-center justify-between transition-[scale] duration-100 overflow-x-hidden',
					isExpanded ? '' : 'scale-0',
				)}
			>
				<span>{label}</span>
				{badge && label === 'Ordenes' ? (
					<Badge
						className={cn(
							'group-hover:bg-picker-4 hover:bg-picker-4 group-hover:text-white hover:text-white',
							pathname === href ? 'bg-picker-4 text-white' : '',
						)}
						variant="secondary"
					>
						{badge}
					</Badge>
				) : null}
			</div>
		</ButtonGeneral>
	)
}
