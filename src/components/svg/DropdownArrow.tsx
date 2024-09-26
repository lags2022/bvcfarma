import { type ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

export const DropdownArrow = ({ className }: { className?: ClassValue }) => {
	return (
		<svg
			className={cn(
				'fill-current h-4 w-4 transition-transform ease-in-out',
				className,
			)}
			viewBox="0 0 20 20"
		>
			<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
		</svg>
	)
}
