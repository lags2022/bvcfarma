import { OrderItemProduct } from '@prisma/client'

import { executeAction } from '@/helpers/execute-action'
import {
	OrderItemsModelConstructor,
	OrderItemsModelImplements,
} from '@/interfaces/models'
import { OrderGetAll } from '@/interfaces/orders/order-get-all'
import prisma from '@/lib/prisma'
import { staticImplements } from '@/lib/static'

import { selectTrueKeys } from '../../helpers/select-true-key-prisma'

@staticImplements<OrderItemsModelConstructor>()
export class OrderItemsModelPrisma implements OrderItemsModelImplements {
	private static readonly keysOrderItemGetAllTrue: (keyof OrderItemProduct)[] =
		['id', 'price', 'quantity', 'name', 'image', 'subtotalItem']

	static async getAllByOrderId(
		orderId: string,
	): Promise<OrderGetAll['orderItems']> {
		return executeAction(async () => {
			const orderItems = await prisma.orderItemProduct.findMany({
				where: {
					orderId,
				},
				select: {
					...selectTrueKeys(this.keysOrderItemGetAllTrue),
				},
			})
			return orderItems as unknown as OrderGetAll['orderItems']
		})
	}
}
