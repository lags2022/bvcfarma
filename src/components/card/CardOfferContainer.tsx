import Image from 'next/image'

import { cn } from '@/lib/utils'
import { CarouselProvider } from '@/providers/CarouselProvider'

import { CardTitleWrapper } from '../shared/CardTitleWrapper'
import { Card, CardContent } from '../ui/card'
import { CarouselItem } from '../ui/carousel'

const imagesOffers = [
	'https://images.ctfassets.net/buvy887680uc/84XQzl9RmGcpydBhAxx0c/80c167c4d93baadf11c1e658703a5bdb/Larocheposay-effaclar-mifarma-bx4-web.jpg',
	'https://images.ctfassets.net/buvy887680uc/4dPHDsrdySUFwbxlyQXDiz/7231052c9326efa7638152634a9536be/serums-dermocosmetica-mifarma-bx4-web.jpg',
	'https://images.ctfassets.net/buvy887680uc/1TejabkjhW0SdMGyFtf5cL/1f66c48168d1224b0c951770630f1227/Larocheposay-effaclar-cremas-dermocosmetica-mifarma-bx4-web.jpg',
	'https://images.ctfassets.net/buvy887680uc/48Lm3iib8PC6tEAK1Qy7Ko/9cdf07cda7b2adbaab20ecc151bdf6cc/Larocheposay-anthelios-dermocosmetica-mifarma-bx4-web.jpg',
]
export const CardOfferContainer = () => {
	return (
		<CardTitleWrapper title="Ofertas" typeComponent="homeOffers">
			<div className="px-4 md:px-6">
				<CarouselProvider type="homeOffers">
					{imagesOffers.map((image, index) => (
						<CarouselItem
							key={index}
							className={cn(
								'md:basis-1/2 lg:basis-1/3 xl:basis-1/4 xl:pl-12',
							)}
						>
							<Card className="border-none mx-auto w-fit p-0 max-w-64 rounded-xl shadow-md my-2">
								<CardContent className="w-fit p-0 rounded-xl">
									<Image
										key={index}
										src={image}
										alt={`offer ${index}`}
										width={386}
										height={526}
										className="aspect-[386/526] rounded-xl hover:scale-[103%] transition-transform duration-300 ease-in-out cursor-pointer active:scale-95"
									/>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselProvider>
			</div>
		</CardTitleWrapper>
	)
}
