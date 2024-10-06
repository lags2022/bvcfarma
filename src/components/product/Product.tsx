import { capitalize } from '@/helpers/capitalize'
import {
	getProductsById,
	getCategoryById,
	getSubCategoryById,
	getSubSubCategoryById,
	getBrandById,
	getSavingsScaleByIdProduct,
} from '@/services/getProducts'

import { ProductDeilts } from './product-details/ProductDetails'
import { ProductCarousel } from './ProductCarousel'
import { BreadCrumbShared } from '../shared/BreadCrumbShared'

export const Product = async ({ productId }: { productId: string }) => {
	const {
		id,
		name,
		image,
		price,
		typeOffer,
		stock,
		idLinea,
		idCategory,
		masterpack,
		description,
		idSubCategory,
		expirationDate,
		idSubSubCategory,
	} = await getProductsById(productId)

	const [categorie, subcategories, subsubcategories, linea, savingsScale] =
		await Promise.all([
			getCategoryById(idCategory).then((res) => res.name),
			getSubCategoryById(idSubCategory).then((res) => res.name),
			getSubSubCategoryById(idSubSubCategory).then((res) => res.name),
			getBrandById(idLinea).then((res) => res.name),
			getSavingsScaleByIdProduct(productId),
		])

	const breadcrumbItems = [
		{ href: '/products', label: 'Products' },
		{ href: `/products`, label: capitalize(categorie) },
		{ href: `/products`, label: capitalize(subcategories) },
		{
			href: `/products`,
			label: capitalize(subsubcategories),
		},
		{
			href: `/products/${productId}`,
			label: capitalize(name),
		},
	]

	return (
		<div className="space-y-4 md:space-y-6">
			<BreadCrumbShared breadcrumbItems={breadcrumbItems} />

			<div className="flex flex-col justify-center md:flex-row gap-6 xl:gap-8 contain">
				<div className="max-w-md mx-auto md:mx-0 md:max-w-sm">
					<ProductCarousel image={image} />
				</div>
				<ProductDeilts
					id={id}
					name={name}
					image={image}
					price={price}
					typeOffer={typeOffer}
					stock={stock}
					linea={linea}
					masterpack={masterpack}
					description={description}
					expirationDate={expirationDate}
					subCategory={subcategories}
					savingsScale={savingsScale}
				/>
			</div>
		</div>
	)
}
