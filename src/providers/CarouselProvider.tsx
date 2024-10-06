'use client'

import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

import {
	CarouselApi,
	Carousel,
	CarouselContent,
	CarouselPrevious,
	CarouselNext,
} from '@/components/ui/carousel'
import { TypeComponentCarousel } from '@/interfaces/type-component'
import { cn } from '@/lib/utils'

interface CarouselProviderProps {
	children: React.ReactNode
	type: TypeComponentCarousel
	setApi?: (api: CarouselApi) => void
}

export function CarouselProvider({
	children,
	type,
	setApi,
}: CarouselProviderProps) {
	const plugin = useRef(
		Autoplay({
			delay: 4000,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		}),
	)

	const isAutoplay = ['homeHero', 'homeLines'].includes(type)

	return (
		<Carousel
			setApi={setApi ? setApi : () => {}}
			plugins={isAutoplay ? [plugin.current] : []}
			className={cn(
				type === 'productHero' ? '' : 'w-full mx-auto max-w-full group',
			)}
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			opts={{
				align: 'start',
				loop: true,
				dragFree: type === 'homeLines',
			}}
		>
			<CarouselContent className={cn(
        type==="homeOffers" && "xl:-ml-12",
        // type==="homeOffer" && "xl:-ml-6",
      )}>{children}</CarouselContent>

			<CarouselPrevious
				className={cn(
					// no funciona si lo coloco en el global.css
					type === 'homeHero' &&
						'opacity-0 bg-picker-5 w-10 h-16 hover:bg-gray-700 hover:text-white text-white border-none rounded-l-none rounded-r-md transition-opacity ease-in-out duration-300 left-0 group-hover:opacity-100',
					type === 'homeOffers' && '-left-4 xl:hidden',
					type === 'homeProduct' && '-left-4 xl:-left-6',
					type === 'homeOffer' && '-left-11',
					type === 'productHero' && '-left-0',
				)}
			/>
			<CarouselNext
				className={cn(
					// no funciona si lo coloco en el global.css
					type === 'homeHero' &&
						'opacity-0 bg-picker-5 w-10 h-16 hover:bg-gray-700 hover:text-white text-white border-none rounded-r-none rounded-l-md transition-opacity ease-in-out duration-300 right-0 group-hover:opacity-100',
					type === 'homeOffers' && '-right-4 xl:hidden',
					type === 'homeProduct' && '-right-4 xl:-right-6',
					type === 'homeOffer' && '-right-11',
					type === 'productHero' && '-right-0',
				)}
			/>
		</Carousel>
	)
}
