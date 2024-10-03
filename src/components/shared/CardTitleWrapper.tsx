import { ClassValue } from 'clsx'

import { TypeComponentCarousel } from '@/interfaces/type-component'
import { cn } from '@/lib/utils'

export const CardTitleWrapper = ({
	children,
	title,
	className,
	notTitle,
	typeComponent,
}: {
	children: React.ReactNode
	title: string
	className?: ClassValue
	notTitle?: boolean
	typeComponent?: TypeComponentCarousel
}) => {
	return (
		<div className="contain mx-auto space-y-4">
			{!notTitle && (
				<h4
					id="lo-mas-buscado"
					className="font-bold text-lg border-b border-gray-200 pb-1"
				>
					{title}
				</h4>
			)}
			<div
				className={cn(
					className,
					typeComponent &&
						['homeOffers', 'homeProduct'].includes(typeComponent) &&
						'p-0 max-w-sm md:max-w-2xl lg:max-w-5xl xl:max-w-max mx-auto',
				)}
			>
				{children}
			</div>
		</div>
	)
}
