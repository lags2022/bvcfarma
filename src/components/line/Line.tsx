import Image from 'next/image'
import Link from 'next/link'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export const Line = ({
	image,
	id,
	name,
}: {
	image: string
	name: string
	id: number
}) => {
	return (
		<Link href={`/products?lines=${id}`} className="w-full h-full">
			<TooltipProvider delayDuration={100}>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="rounded-sm ml-4 overflow-hidden shadow-lg">
							<Image
								src={image}
								alt={name}
								width={200}
								height={200}
								className="max-w-none size-24 aspect-auto object-cover transition-all duration-500 ease-in-out hover:scale-105"
							/>
						</div>
					</TooltipTrigger>
					<TooltipContent sideOffset={-30}>
						<p className="text-xs">{name}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</Link>
	)
}
