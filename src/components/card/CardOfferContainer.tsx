import Image from 'next/image'

import { CardTitleWrapper } from '../shared/CardTitleWrapper'

export const CardOfferContainer = () => {
	const imagesOffers = [
		'https://images.ctfassets.net/buvy887680uc/84XQzl9RmGcpydBhAxx0c/80c167c4d93baadf11c1e658703a5bdb/Larocheposay-effaclar-mifarma-bx4-web.jpg',
		'https://images.ctfassets.net/buvy887680uc/4dPHDsrdySUFwbxlyQXDiz/7231052c9326efa7638152634a9536be/serums-dermocosmetica-mifarma-bx4-web.jpg',
		'https://images.ctfassets.net/buvy887680uc/1TejabkjhW0SdMGyFtf5cL/1f66c48168d1224b0c951770630f1227/Larocheposay-effaclar-cremas-dermocosmetica-mifarma-bx4-web.jpg',
		'https://images.ctfassets.net/buvy887680uc/48Lm3iib8PC6tEAK1Qy7Ko/9cdf07cda7b2adbaab20ecc151bdf6cc/Larocheposay-anthelios-dermocosmetica-mifarma-bx4-web.jpg',
	]

	return (
		<CardTitleWrapper
			title="Ofertas"
			className="flex flex-wrap gap-10 justify-center items-center"
		>
			{imagesOffers.map((image, index) => (
				<Image
					key={index}
					src={image}
					alt={`offer ${index}`}
					width={386}
					height={526}
					className="aspect-[386/526] w-64 object-contain rounded-lg hover:scale-[103%] transition-transform duration-300 ease-in-out cursor-pointer active:scale-95"
				/>
			))}
		</CardTitleWrapper>
	)
}
