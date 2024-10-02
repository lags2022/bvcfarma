import { TypeComponentCarousel } from '@/interfaces/type-component'
import { getProducts } from '@/services/getProducts'

import { CardProductContainer } from './CardProductContainer'
import { CardTitleWrapper } from '../shared/CardTitleWrapper'

export const CardProductCarousel = async ({
	type,
}: {
	type: TypeComponentCarousel
}) => {
	const products = await getProducts()

	return (
		<CardTitleWrapper
			title="Lo más buscado"
			notTitle={type === 'homeOffer'}
      typeComponent={type}
		>
			<CardProductContainer products={products} type={type} />
		</CardTitleWrapper>
	)
}
