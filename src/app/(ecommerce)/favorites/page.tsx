import { Favorites } from '@/components/favorites/Favorites'
import { getProducts } from '@/services/getProducts'

export default async function PageFavorites() {
	const products = await getProducts()

	return <Favorites products={products} />
}
