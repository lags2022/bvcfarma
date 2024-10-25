import {
	CulqiCharge,
	Order,
	OrderAddress,
	OrderItemProduct,
	Prisma,
} from '@prisma/client'

import { executeAction } from '@/helpers/execute-action'
import {
	OrderModelConstructor,
	OrderModelImplements,
} from '@/interfaces/models'
import { OrderGetAll } from '@/interfaces/orders/order-get-all'
import prisma from '@/lib/prisma'
import { staticImplements } from '@/lib/static'

import { selectTrueKeys } from '../../helpers/select-true-key-prisma'

@staticImplements<OrderModelConstructor>()
export class OrderModelPrisma implements OrderModelImplements {
	static async create(data: Prisma.OrderCreateInput): Promise<Order> {
		return executeAction(async () => {
			const orderCreated = await prisma.order.create({
				data,
			})

			return orderCreated
		})
	}

	static async getById(
		id: string,
	): Promise<(Order & { orderAddress?: OrderAddress | null }) | null> {
		return executeAction(async () => {
			const order = await prisma.order.findUnique({
				where: {
					id,
					isActive: true,
				},
				include: {
					orderAddress: true,
				},
			})
			return order
		})
	}

	static async getByField(
		field: keyof Order,
		value: string,
		orderAddress?: boolean,
		culqiCharge?: boolean,
		orderItems?: boolean,
	): Promise<
		| (Order & {
				orderAddress?: OrderAddress | null
				culqiCharge?: CulqiCharge | null
				orderItems?: OrderItemProduct[]
		  })
		| null
	> {
		return executeAction(async () => {
			const order = await prisma.order.findFirst({
				where: {
					[field]: value,
					isActive: true,
				},
				include: {
					orderAddress,
					culqiCharge,
					orderItems,
				},
			})
			return order
		})
	}

	static async getAll(): Promise<Order[]> {
		return executeAction(async () => {
			const orders = await prisma.order.findMany({
				where: {
					isActive: true,
				},
			})
			return orders
		})
	}

	private static readonly keysOrderGetAllTrue: (keyof Order)[] = [
		'id',
		'ocNumber',
		'status',
		'paidAt',
		// 'isPaid',
		'paymentMethod',
		'deliveryType',
		'quantityItems',
		'total',
		'totalCart',
		'discount',
		'subtotal',
		'shippingCost',
		// 'transactionId',
		// 'documentUrl',
		// 'userId',
	]

	private static readonly keysOrderAddressGetAllTrue: (keyof OrderAddress)[] = [
		'firstName',
		'lastName',
		'address',
		// 'district',
		// 'province',
		// 'department',
	]

	// private static readonly keysOrderItemGetAllTrue: (keyof OrderItemProduct)[] =
	// 	['id', 'price', 'quantity', 'name', 'image', 'subtotalItem']

	static async getAllByUserId(userId: string): Promise<OrderGetAll[]> {
		return executeAction(async () => {
			const orders = await prisma.order.findMany({
				where: {
					userId,
					isActive: true,
				},
				orderBy: {
					paidAt: 'desc',
				},
				select: {
					...selectTrueKeys(this.keysOrderGetAllTrue),
					// orderItems: {
					// 	select: selectTrueKeys(this.keysOrderItemGetAllTrue),
					// },
					orderAddress: {
						select: selectTrueKeys(this.keysOrderAddressGetAllTrue),
					},
					user: {
						select: {
							email: true,
						},
					},
				},
			})
			return orders as OrderGetAll[]
		})
	}

	static async getLastOrder(): Promise<Order | null> {
		return executeAction(async () => {
			const order = await prisma.order.findFirst({
				orderBy: {
					ocNumber: 'desc',
				},
			})
			return order
		})
	}

	static async update(
		id: string,
		data: Partial<Prisma.OrderCreateInput>,
	): Promise<Order> {
		return executeAction(async () => {
			return await prisma.order.update({ where: { id }, data })
		})
	}
}
