import { ScrollArea } from '@/components/ui/scroll-area'
import { getProducts } from '@/services/getProducts'
import Image from 'next/image'
import { Star } from 'lucide-react'

function getRandomRating() {
	// Calificación aleatoria entre 1 y 5
	const rating = Math.floor(Math.random() * 5) + 1

	// Número aleatorio de reseñas entre 10 y 20
	const reviews = Math.floor(Math.random() * 11) + 10

	return {
		rating,
		reviews,
	}
}

function Rating({ rating, reviews }: { rating: number; reviews: number }) {
	// Crear estrellas basadas en la calificación
	const stars = Array.from({ length: 5 }, (_, i) => {
		if (i < rating)
			return <Star className="size-4 fill-yellow-600" key={i} color="gold" />
		return <Star className="size-4" key={i} color="gray" />
	})

	return (
		<div className="flex flex-col">
			<div className="flex">{stars}</div>
			<span className="text-xs">{reviews} reviews</span>
		</div>
	)
}

export const DashboardTopProductsFetch = async () => {
	const products = await getProducts()

	return (
		<ScrollArea className="h-96 px-4 py-2">
			<ul className="flex flex-col gap-4">
				{products.map((product) => {
					const { rating, reviews } = getRandomRating() // Obtener calificación y reseñas aleatorias

					return (
						<li
							key={product.id}
							className="flex items-center gap-2 text-sm justify-between"
						>
							<div className="flex gap-2">
								<Image
									src={product.image}
									alt={product.name}
									width={50}
									height={50}
									className="rounded-lg aspect-square size-12 object-cover"
								/>
								<div className="flex flex-col">
									<p className="capitalize font-medium">{product.name}</p>
									<p>S./ {product.price}</p>
								</div>
							</div>
							<div>
								<Rating rating={rating} reviews={reviews} />
							</div>
						</li>
					)
				})}
			</ul>
		</ScrollArea>
	)
}
