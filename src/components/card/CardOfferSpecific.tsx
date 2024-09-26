import Image from 'next/image'

import { CardProductCarousel } from './CardProductCarousel'
import { CardTitleWrapper } from '../shared/CardTitleWrapper'

export const CardOfferSpecific = () => {
	return (
		<CardTitleWrapper title="Energía y bienestar en cada sorbo">
			<div className="w-full flex justify-center items-center">
				<Image
					src="https://images.ctfassets.net/buvy887680uc/3jsNYQl6jbAorUqxeRmDo7/41682010c8219c60e6c8ce352352c114/Packvital-nutricionadulto-mifarma-bannerhomelist-web.jpg"
					alt="offer"
					width={456}
					height={553}
					className="aspect-[456/553] object-contain w-[340px] rounded-3xl"
				/>
				<div className="max-w-[800px]">
					<CardProductCarousel type="homeOffer" />
				</div>
			</div>
		</CardTitleWrapper>
	)
}
