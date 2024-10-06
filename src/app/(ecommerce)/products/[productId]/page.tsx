import { Product } from '@/components/product/Product'

export default function PageProduct({
	params,
}: {
	params: { productId: string }
}) {
	return (
		<main className='py-4 md:py-6'>
			<Product productId={params.productId} />
		</main>
	)
}
