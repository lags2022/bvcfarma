'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { CarouselProvider } from '@/providers/CarouselProvider'

export const ProductCarousel = ({ image }: { image: string }) => {
	const [api, setApi] = useState<CarouselApi>()
	const [currentIndex, setCurrentIndex] = useState(0)

	const images = Array.from({ length: 3 }, (_, index) => ({
		src: image,
		alt: `Image ${index + 1}`,
	}))

	const onSelect = useCallback(() => {
		if (!api) return
		setCurrentIndex(api.selectedScrollSnap())
	}, [api])

	useEffect(() => {
		if (!api) return
		api.on('select', onSelect)
		return () => {
			api.off('select', onSelect)
		}
	}, [api, onSelect])

	const handleThumbnailClick = (index: number) => {
		if (api) {
			api.scrollTo(index)
		}
	}

	return (
		<div className="w-full max-w-3xl mx-auto space-y-4">
			<CarouselProvider type="productHero" setApi={setApi}>
				{images.map((image, index) => (
					<CarouselItem key={index}>
						<Card>
							<CardContent className="flex aspect-video items-center justify-center p-6">
								<Image
									src={image.src}
									alt={image.alt}
									width={600}
									height={400}
									className="aspect-[600/400] size-full object-contain"
								/>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselProvider>

			<div className="flex justify-center space-x-2 overflow-x-auto py-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => handleThumbnailClick(index)}
						className={cn(
							'w-16 h-16 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all',
							currentIndex === index
								? 'ring-2 ring-blue-500 scale-110'
								: 'opacity-70 hover:opacity-100',
						)}
						aria-label={`View ${image.alt}`}
					>
						<Image
							src={image.src}
							alt={`Thumbnail for ${image.alt}`}
							width={64}
							height={64}
							className="aspect-square size-full object-contain"
						/>
					</button>
				))}
			</div>
		</div>
	)
}
