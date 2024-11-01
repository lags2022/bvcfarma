import { User, UserAddress } from '@prisma/client'

import { UserWithSelectedAddressFields } from '@/models/prisma/user-model'

import { UserModelMod } from './models'

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
	data?: any
	status: string
}

export interface ResponseStatusUserUpdated {
	message: string
	data: UserWithSelectedAddressFields
	status: string
}

export type TypeTableDashboard =
	| 'ownerDashboard'
	| 'ownerDashboardOrders'
	| 'customerOrders'

export type RouteTable =
	| '/orders'
	| '/dashboard/orders'
	| '/dashboard/products'
	| '/dashboard/customers'
