import { ClassValue } from 'clsx'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ButtonBaseProps {
	children: React.ReactNode
	onClick?: () => void
  disabled?: boolean
	className?: ClassValue
	size?: 'default' | 'sm' | 'lg' | 'icon'
	type?: 'button' | 'reset' | 'submit'
	variant?:
		| 'default'
		| 'link'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
}

interface ButtonGeneralProps extends ButtonBaseProps {
	href?: string
}

export const ButtonGeneral = ({
	className,
	href,
	...props
}: ButtonGeneralProps) => {
	return href ? (
		<Link href={href} className={cn(className)}>
			<ButtonBase {...props} />
		</Link>
	) : (
		<ButtonBase className={className} {...props} />
	)
}

const ButtonBase = ({
	children,
	onClick,
	className,
	size,
	variant = 'default',
	type = 'button',
  disabled
}: ButtonBaseProps) => {
	return (
		<Button
			onClick={onClick}
			className={cn(
				variant === 'default' &&
					'w-full bg-picker-3 text-white hover:bg-picker-4',
				className,
				size === 'icon' && 'size-10',
        disabled && 'cursor-not-allowed bg-gray-300'
			)}
			variant={variant}
			type={type}
			size={size}
      disabled={disabled}
		>
			{children}
		</Button>
	)
}
