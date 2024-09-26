import { type ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

export const UnderlineAnimation = ({
	className,
}: {
	className: ClassValue
}) => {
	return (
		<div
			className={cn(
				'absolute bottom-0 h-[3px] w-0 group-hover:w-full transition-[width] duration-300 ease-in-out rounded-t-xl',
				className,
			)}
		></div>
	)
}
