import { ClassValue } from 'clsx'

import { cn } from '@/lib/utils'

import { Facebook } from '../svg/Facebook'
import { Instagram } from '../svg/Instagram'
import { Youtube } from '../svg/Youtube'

export const Social = ({ className }: { className?: ClassValue }) => {
	return (
			<div
				className={cn('flex items-center justify-center space-x-3', className)}
			>
				<a href="#" rel="noopener noreferrer" target="_blank">
					<Instagram className="size-6 text-picker-3" />
				</a>
				<a href="#" rel="noopener noreferrer" target="_blank">
					<Facebook className="size-6 text-picker-3" />
				</a>
				<a href="#" rel="noopener noreferrer" target="_blank">
					<Youtube className="size-6 text-picker-3" />
				</a>
			</div>
	)
}
