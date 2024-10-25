import { useEffect, useState } from 'react'

import { getUser } from '@/actions/user-action'
import { useFavoriteStore } from '@/context/useFavoriteStore'

export const useFetchFavorites = () => {
	const setFavorites = useFavoriteStore((state) => state.setFavorites)
	const [isLoading, setIsLoading] = useState(true) // Para manejar la carga inicial

	useEffect(() => {
		const syncFavorites = async () => {
			try {
				const favorites = (await getUser(false))?.favorites

				if (!favorites?.length) {
					setFavorites([])
					return
				}

				setFavorites(favorites)
			} catch (error) {
				console.log(error, 'Error fetching favorites:')
			} finally {
				setIsLoading(false)
			}
		}

		syncFavorites()
	}, [])

	return isLoading
}

// export const useFetchFavorites = (isPageFavorites: boolean = false) => {
// 	const setFavorites = useFavoriteStore((state) => state.setFavorites)
// 	const [favoriteProducts, setFavoriteProducts] = useState<ProductApiProps[]>(
// 		[],
// 	)

// 	useEffect(() => {
// 		const syncFavorites = async () => {
// 			try {
// 				const favorites = (await getUserAction(false))?.favorites

// 				if (!favorites?.length) {
// 					setFavorites([])
// 					return
// 				}

// 				if (isPageFavorites) {
// 					const products = await getProducts()

// 					const favoritesProducts = products.filter((product) =>
// 						favorites?.includes(product.id),
// 					)

// 					setFavoriteProducts(favoritesProducts)
// 				}

// 				setFavorites(favorites)
// 			} catch (error) {
// 				console.log(error, 'Error fetching favorites:')
// 			}
// 		}

// 		syncFavorites()
// 	}, [])

// 	if (isPageFavorites) {
// 		return favoriteProducts
// 	}
// }
