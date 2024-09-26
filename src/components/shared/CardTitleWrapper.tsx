import { ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

export const CardTitleWrapper = ({
	children,
	title,
	className,
	notTitle,
}: {
	children: React.ReactNode
	title: string
	className?: ClassValue
	notTitle?: boolean
}) => {
	return (
		<div className="max-w-7xl mx-auto space-y-4 px-4">
			{!notTitle && (
				<h4 id="lo-mas-buscado" className="font-bold text-lg pl-14">
					{title}
				</h4>
			)}
			<div className={cn('container', className)}>{children}</div>
		</div>
	)
}
