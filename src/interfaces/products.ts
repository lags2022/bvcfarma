export interface ProductApiProps {
	id: number
	name: string
	image: string
	price: string
	typeOffer: TypeOffer
	stock: string
	idLinea: string
	idCategory: string
	masterpack: string
	description: string
	typeProduct: TypeProduct
	idSubCategory: string
	expirationDate: Date
	fechaCreacion: Date
	idSubSubCategory: string
}

export interface SavingsScaleApi {
	id: number
	units: string
	descuento: string
	idProduct: string
	precio_final: string
	precio_lista: string
}

export interface ProductPropsView
	extends Omit<
		ProductApiProps,
		| 'idLinea'
		| 'idCategory'
		| 'idSubCategory'
		| 'idSubSubCategory'
		| 'typeProduct'
		| 'fechaCreacion'
	> {
	linea: string
	subCategory: string
	savingsScale: SavingsScaleApi[]
}

export enum TypeProduct {
	Otc = 'otc',
	Prescription = 'prescription',
}

export interface CardProductProps {
	id: number
	image: string
	name: string
	typeOffer?: TypeOffer
	price: string
	isStock: boolean
}

export enum TypeOffer {
	SuperOferta = 'superOferta',
	CanastasEnOferta = 'canastas en oferta',
	Bonificacion = 'bonificación',
}
