'use client'

import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { WhatsappLink } from './WhatsappLink'

export const WhatsappFloating = ({
	text,
	className,
}: {
	text?: string
	className?: string
}) => {
	const pathname = usePathname()

	return (
		<WhatsappLink
			className={cn(
				'size-14 fixed bottom-5 right-5 hover:scale-110 transition-transform ease-in-out duration-300 active:scale-90 cursor-pointer z-30',
				pathname.startsWith('/products') && 'bottom-20 md:bottom-5',
			)}
		/>
	)
}
