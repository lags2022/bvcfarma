export interface CategoryApi {
	id: number
	icon: string // Ejemplo de valor: "U+1F48A"
	name: string // Ejemplo de valor: "medicamentos"
}

export interface SubCategoryApi {
	id: number
	name: string // Ejemplo de valor: "analgesicos"
	idCategory: string // Este es el ID de la categoría a la que pertenece
}

export interface SubSubCategoryApi {
	id: number
	name: string // Ejemplo de valor: "analgesicos"
	idSubCategory: string // Este es el ID de la categoría a la que pertenece
}

export interface BrandsApi {
	id: number
	name: string
	image: string
}

export interface ResponseStatus {
  message: string
  status: string
}