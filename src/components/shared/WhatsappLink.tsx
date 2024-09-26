import { ClassValue } from 'clsx'

import { Whatsapp } from '@/components/svg/Whatsapp'
import { cn } from '@/lib/utils'

export const WhatsappLink = ({
	text,
	className,
}: {
	text?: string
	className?: ClassValue
}) => {
	return (
		<a
			href="https://wa.me/yourwhatsappnumber"
			target="_blank"
			rel="noopener noreferrer"
			className="flex items-center justify-center w-fit mx-auto"
		>
			<Whatsapp className={cn(className)} />
			{text}
		</a>
	)
}

// Contáctanos por Whatsapp
