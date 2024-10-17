import Image from 'next/image'
import Link from 'next/link'

import { LOGO, NAME } from '@/constants/general'
import { cn } from '@/lib/utils'

import { SidebarContent } from './SidebarContent'

export const Sidebar = ({ isExpanded }: { isExpanded: boolean }) => {
	return (
		<div
			className={cn(
				'bg-light dark:bg-dark transition-[width] ease duration-300 z-50 h-dvh hidden lg:flex flex-col border-r',
				isExpanded ? 'w-56' : 'w-[72px]',
			)}
		>
			{/* logo de la empresa */}
			<Link href="/" className="flex items-center gap-1 p-4">
				{/* <Package2Icon className="h-8 w-8 flex-shrink-0" /> */}
				<Image
					src={LOGO}
					alt="Logo"
					width={384}
					height={321}
					className="aspect-[384/321] ml-1 w-9 object-contain"
				/>
				<Image
					src={NAME}
					alt="Logo"
					width={750}
					height={114}
					className={cn(
						'aspect-[750/114] w-28 md:w-32 object-contain',
						isExpanded ? '' : 'scale-0',
					)}
				/>
			</Link>

			<SidebarContent isExpanded={isExpanded} />
		</div>
	)
}
