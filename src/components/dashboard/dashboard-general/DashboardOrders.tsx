import { getAllOrders } from '@/actions/order-action'
import { orderColumnsUser } from '@/components/order/order-columns-use-case/orderColumnsUser'
import { Order } from '@/components/order/order-data-table/Order'
import { orderParsed } from '@/schemas/order-data-schema'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const DashboardOrders = async () => {
	const orders = await getAllOrders()

	const ordersParse = orderParsed(orders)

	return (
		<DashboardWrapperItem>
			<div className="flex flex-col contain justify-center items-start gap-4">
				<h2 className="text-lg font-bold flex flex-col gap-2 tracking-tight">
					Lista de pedidos ({ordersParse.length})
				</h2>
				<p className="text-muted-foreground">
					Detalles del pedido y seguimiento
				</p>
			</div>
			<div className="w-full overflow-hidden">
				<Order data={ordersParse} columns={orderColumnsUser} />
			</div>
		</DashboardWrapperItem>
	)
}
