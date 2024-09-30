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
}: {
	icon: React.ReactNode
	label: string
	isExpanded: boolean
	badge?: string
	href?: string
}) {
	const pathname = usePathname()

	return (
		<ButtonGeneral
			variant={pathname === href ? 'default' : 'ghost'}
			className="w-full [&>button]:w-full !flex justify-start [&>button]:!flex [&>button]:gap-2 gap-2 [&>button]:justify-start"
			href={href}
		>
			<div className="shrink-0">{icon}</div>
			<div
				className={cn(
					'w-full flex items-center justify-between transition-[scale] duration-100 overflow-x-hidden',
					isExpanded ? '' : 'scale-0',
				)}
			>
				<span>{label}</span>
				{badge && <Badge variant="secondary">{badge}</Badge>}
			</div>
		</ButtonGeneral>
	)
}
