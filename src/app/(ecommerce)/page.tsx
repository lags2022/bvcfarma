import { CardOfferContainer } from '@/components/card/CardOfferContainer'
import { CardOfferSpecific } from '@/components/card/CardOfferSpecific'
import { CardProductCarousel } from '@/components/card/CardProductCarousel'
import { HomeCarousel } from '@/components/home/HomeCarousel'
import { HomeCountdownTimer } from '@/components/home/HomeCountdownTimer'
import { LinesContainer } from '@/components/line/LinesContainer'

export default function Home() {
	return (
    // se coloco bg-white porque el drawer hace que se vea negro en el fondo de algunas componentes
		<div className="w-full space-y-10 bg-white">
			<HomeCarousel />
			{/* <HomeCountdownTimer /> */}
			<CardProductCarousel type="homeProduct" />
			<CardOfferContainer />
			{/* <CardOfferSpecific /> */}
			<LinesContainer />
		</div>
	)
}
