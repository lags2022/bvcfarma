import { z } from 'zod'

import { ProductApiProps } from '@/interfaces/products'

export const transformedProducts = (products: ProductApiProps[]) =>
	products.map((product) => ({
		id: product.id,
		name: product.name,
		image: product.image,
		price: product.price,
		typeOffer: product.typeOffer,
		stock: product.stock,
		// masterpack: product.masterpack,
		typeProduct: product.typeProduct,
	}))

export const productsSchema = z.object({
	id: z.number(),
	name: z.string(),
	image: z.string(),
	price: z.string(),
	typeOffer: z.string(),
	stock: z.string(),
	// masterpack: z.string(),
	typeProduct: z.string(),
})

export type ProductsSchemaType = z.infer<typeof productsSchema>

export const productsParsed = (products: ProductApiProps[]) =>
	z.array(productsSchema).parse(transformedProducts(products))
