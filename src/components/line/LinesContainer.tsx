import Image from 'next/image'

import { CarouselItem } from '@/components/ui/carousel'
import { CarouselProvider } from '@/providers/CarouselProvider'
import { getBrands } from '@/services/getProducts'

import { Line } from './Line'
import { CardTitleWrapper } from '../shared/CardTitleWrapper'

export const LinesContainer = async () => {
	const lines = await getBrands()

	return (
		<CardTitleWrapper className="mx-auto px-12" title="Compra por líneas">
			<CarouselProvider type="homeLines">
				{lines.map(({ id, image, name }) => (
					<CarouselItem key={id} className="basis-32 cursor-pointer">
						<Line image={image} id={id} name={name} />
					</CarouselItem>
				))}
			</CarouselProvider>
		</CardTitleWrapper>
	)
}
