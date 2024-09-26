import { z } from 'zod'

import { getOrders } from '@/actions/order-action'
import { Orders } from '@/components/order/Orders'
import { orderSchema, transformedOrders } from '@/schemas/order-data-schema'

export default async function OrdersPage() {
	const orders = await getOrders()

	const orderParse = z.array(orderSchema).parse(transformedOrders(orders))

	return (
		<div className="text-sm space-y-8 w-full">
			<Orders data={orderParse} />
		</div>
	)
}
