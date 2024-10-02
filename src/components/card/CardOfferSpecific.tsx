import Image from 'next/image'

import { CardProductCarousel } from './CardProductCarousel'
import { CardTitleWrapper } from '../shared/CardTitleWrapper'

export const CardOfferSpecific = () => {
	return (
		<CardTitleWrapper title="Energía y bienestar en cada sorbo" className="pt-4">
			<div className="flex flex-col md:flex-row justify-center items-center gap-6 xl:gap-0 px-4 lg:px-6 mx-auto">
				<Image
					src="https://images.ctfassets.net/buvy887680uc/3jsNYQl6jbAorUqxeRmDo7/41682010c8219c60e6c8ce352352c114/Packvital-nutricionadulto-mifarma-bannerhomelist-web.jpg"
					alt="Offer Específico"
					width={456}
					height={553}
					className="aspect-[456/553] object-contain w-[500px] md:w-[340px] rounded-2xl"
				/>
				<div className="max-w-[300px] sm:max-w-[550px] md:max-w-[300px] lg:max-w-[600px] xl:max-w-[880px] mx-0 xl:mx-auto">
					<CardProductCarousel type="homeOffer" />
				</div>
			</div>
		</CardTitleWrapper>
	)
}
