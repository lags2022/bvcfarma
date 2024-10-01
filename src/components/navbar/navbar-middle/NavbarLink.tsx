import { ClassValue } from 'clsx'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export const NavbarLink = ({
	href,
	icon,
	label,
	isDropdown = true,
	onClick,
	className,
	isActive,
}: {
	href?: string
	icon: React.ReactNode
	label: string
	isDropdown?: boolean
	onClick?: () => void
	className?: ClassValue
	isActive?: boolean
}) => {
	return isDropdown ? (
		<ButtonGeneral
			href={href}
			variant="ghost"
			onClick={onClick}
			className={cn(
				'bg-transparent w-full h-fit p-0 m-0 [&>button]:bg-transparent [&>button]:w-full [&>button]:h-fit [&>button]:p-0 [&>button]:m-0 [&>button]:justify-start [&>button]:mb-1',
				className,
				isActive && '[&>button]:bg-accent [&_span]:text-black [&_svg]:text-black',
			)}
		>
			<DropdownMenuItem className="w-full flex items-center gap-2 font-medium text-gray-500 group hover:text-black transition-[color] ease duration-300 cursor-pointer">
				<div className="[&>svg]:size-4 [&>svg]:text-gray-500  group-hover:[&>svg]:text-black">
					{icon}
				</div>
				<span>{label}</span>
			</DropdownMenuItem>
		</ButtonGeneral>
	) : (
		<ButtonGeneral
			href={href}
			variant="ghost"
			onClick={onClick}
			className={cn(
				'w-full justify-start gap-2 text-base group',
				className,
				isActive && 'bg-accent text-black [&_svg]:text-black rounded-sm',
			)}
		>
			<div className="[&>svg]:size-5 [&>svg]:text-gray-500 group-hover:[&>svg]:text-black">
				{icon}
			</div>
			{label}
		</ButtonGeneral>
	)
}

// import Link from 'next/link'

// import { Button } from '@/components/ui/button'
// import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

// export const NavbarLink = ({
// 	href,
// 	icon,
// 	label,
// 	type = 'link',
// 	onClick,
// }: {
// 	href: string
// 	icon: React.ReactNode
// 	label: string
// 	type?: 'link' | 'button'
// 	onClick?: () => void
// }) => {
// 	return (
// 		<>
// 			{type === 'link' ? (
// 				<Link href={href}>
// 					<DropdownMenuItem className="flex items-center gap-2 font-medium text-gray-500 group hover:text-black transition-[color] ease duration-300 ">
// 						<div className="[&>svg]:size-4 [&>svg]:text-gray-500  group-hover:[&>svg]:text-black">
// 							{icon}
// 						</div>
// 						{label}
// 					</DropdownMenuItem>
// 				</Link>
// 			) : (
// 				<Button onClick={onClick} variant={'ghost'} className="bg-transparent w-full h-fit p-0 m-0">
// 					<DropdownMenuItem className="flex items-center gap-2 font-medium text-gray-500 group hover:text-black transition-[color] ease duration-300 [&>svg]:size-4 [&>svg]:text-gray-500 group-hover:[&>svg]:text-black">
// 						{icon}
// 						{label}
// 					</DropdownMenuItem>
// 				</Button>
// 			)}
// 		</>
// 	)
// }
