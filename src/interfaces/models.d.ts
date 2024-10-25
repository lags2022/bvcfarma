import {
	Prisma,
	User,
	Order,
	CulqiCharge,
	OrderAddress,
	UserAddress,
} from '@prisma/client'

import { UserUpdateProfileSchemaType } from '@/schemas/profile-schema'

import { ResponseStatus, ResponseStatusUserUpdated } from './general'
import { CrudBasic } from './generic'
import { OrderGetAll } from './orders/order-get-all'

// aqui solo tendrias que cambiar Prisma.UserCreateInput, User por otro modelo de base de datos osea solo cambiarias los tipos
// User Model
export type UserWithSelectedAddressFields = Prisma.UserGetPayload<{
	select: {
		id: true
		name: true
		email: true
		favorites: true
		role: true
		address: true
	}
}>

export interface UserModelImplements {}
export interface UserModelConstructor {
	new (): UserModelImplements
	getByEmail(
		email: string,
		password: string,
	): Promise<UserWithSelectedAddressFields>
	create(data: Prisma.UserCreateInput): Promise<UserWithSelectedAddressFields>
	getById(id: string): Promise<Omit<UserWithSelectedAddressFields, 'address'>>
	addFavorite(userId: string, productId: number): Promise<ResponseStatus>
	removeFavorite(
		userId: string,
		newFavorites: number[],
	): Promise<ResponseStatus>
	getByIdWithAddress(userId: string): Promise<UserWithSelectedAddressFields>
	update(id:string, data: UserUpdateProfileSchemaType): Promise<ResponseStatusUserUpdated>
	delete(id: string): Promise<ResponseStatus>
}

// Order Model
export interface OrderModelImplements {}
export interface OrderModelConstructor
	extends Omit<CrudBasic<Prisma.OrderCreateInput, Order>, 'delete'> {
	new (): OrderModelImplements
	getLastOrder(): Promise<Order | null>
	getAllByUserId(userId: string): Promise<OrderGetAll[]>
	getByField(
		field: keyof Order,
		value: string,
	): Promise<
		| (Order & {
				orderAddress?: OrderAddress | null
				culqiCharge?: CulqiCharge | null
		  })
		| null
	>
}

export interface CulqiChargeModelImplements {}
export interface CulqiChargeModelConstructor
	extends Omit<
		CrudBasic<Prisma.ChargeCreateInput, CulqiCharge>,
		'delete' | 'update' | 'getAll' | 'getById'
	> {
	new (): CulqiChargeModelImplements
}

export interface OrderItemsModelImplements {}
export interface OrderItemsModelConstructor {
	new (): OrderItemsModelImplements
	getAllByOrderId(orderId: string): Promise<OrderGetAll['orderItems']>
}
