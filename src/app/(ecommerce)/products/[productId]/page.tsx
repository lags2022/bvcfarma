import { Product } from '@/components/product/Product'

export default function PageProduct({
	params,
}: {
	params: { productId: string }
}) {
	return (
		<main>
			<Product productId={params.productId} />
		</main>
	)
}
