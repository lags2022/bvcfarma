import {
	URL_PRODUCTS,
	URL_CATEGORIES,
	URL_SUBCATEGORIES,
	URL_SUBSUBCATEGORIES,
	URL_BRANDS,
	URL_SAVINGS_SCALE,
} from '@/constants/general'
import { fetchUrl } from '@/helpers/fetchUrl'
import {
	CategoryApi,
	SubCategoryApi,
	SubSubCategoryApi,
	BrandsApi,
} from '@/interfaces/general'
import { ProductApiProps, SavingsScaleApi } from '@/interfaces/products'

// Función genérica para hacer el fetch
async function fetchData<T>(url: string): Promise<T> {
	try {
		const data = await fetchUrl({ url })
		return data as T
	} catch (error) {
		throw error
	}
}

// products
export async function getProducts() {
	return await fetchData<ProductApiProps[]>(URL_PRODUCTS)
}
export async function getProductsById(productId: string) {
	return await fetchData<ProductApiProps>(`${URL_PRODUCTS}/${productId}`)
}

// categories
export async function getCategories() {
	return await fetchData<CategoryApi[]>(URL_CATEGORIES)
}
export async function getCategoryById(categoryId: string) {
	return await fetchData<CategoryApi>(`${URL_CATEGORIES}/${categoryId}`)
}

// subcategories
export async function getSubCategories() {
	return await fetchData<SubCategoryApi[]>(URL_SUBCATEGORIES)
}
export async function getSubCategoryById(subCategoryId: string) {
	return await fetchData<SubCategoryApi>(
		`${URL_SUBCATEGORIES}/${subCategoryId}`,
	)
}

// subsubcategories
export async function getSubSubCategories() {
	return await fetchData<SubSubCategoryApi[]>(URL_SUBSUBCATEGORIES)
}
export async function getSubSubCategoryById(subSubCategoryId: string) {
	return await fetchData<SubSubCategoryApi>(
		`${URL_SUBSUBCATEGORIES}/${subSubCategoryId}`,
	)
}

// brands
export async function getBrands() {
	return await fetchData<BrandsApi[]>(URL_BRANDS)
}
export async function getBrandById(brandId: string) {
	return await fetchData<BrandsApi>(`${URL_BRANDS}/${brandId}`)
}

// savings scale
export async function getSavingsScale() {
	return await fetchData<SavingsScaleApi[]>(URL_SAVINGS_SCALE)
}
export async function getSavingsScaleByIdProduct(idProduct: string) {
	return await fetchData<SavingsScaleApi[]>(
		`${URL_SAVINGS_SCALE}?idProduct=${idProduct}`,
	)
}
