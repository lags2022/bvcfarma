import Image from 'next/image'

import { CarouselItem } from '@/components/ui/carousel'
import { CarouselProvider } from '@/providers/CarouselProvider'

const images = [
	{
		src: 'https://images.ctfassets.net/buvy887680uc/5d8g6FglN95UTPX38tSt0X/36ac63c5ba605fdee09a6934761a70d2/multicategoria-cross-slide-mifarma-web-bx1__1_.jpg',
		alt: 'Oferta 1',
	},
	{
		src: 'https://images.ctfassets.net/buvy887680uc/4PuzGQIi01rlBHWbivyUNo/8ac7d92f860927f32c06e16ca0928f4a/proxima-compra-setiembre-cross-slide-mifarma-web.jpg',
		alt: 'Oferta 2',
	},
	{
		src: 'https://images.ctfassets.net/buvy887680uc/3g7WoCHIBkSdufmBAYcGtA/52d0c655a7a8df27211c0eb109f3c248/Ninet-slider-mifarma-web-bx2.jpg',
		alt: 'Oferta 3',
	},
]

export const HomeCarousel = () => {
	return (
		<CarouselProvider type="homeHero">
			{images.map(({ src, alt }, index) => (
				<CarouselItem key={index} className="p-0 w-full h-[400px]">
					<Image
						src={src}
						alt={alt}
						width={1000}
						height={400}
						className="w-full h-full object-cover"
					/>
				</CarouselItem>
			))}
		</CarouselProvider>
	)
}
