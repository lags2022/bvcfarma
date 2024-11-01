import { getOrdersByUser } from '@/actions/order-action'
import { orderColumnsUser } from '@/components/order/order-columns-use-case/orderColumnsUser'
import { Order } from '@/components/order/order-data-table/Order'
import { orderParsed } from '@/schemas/order-data-schema'

export default async function OrdersPage() {
	const orders = await getOrdersByUser()

	const orderParse = orderParsed(orders)

	return (
		<main className="text-sm space-y-6 py-4 md:py-6">
			<div className="flex flex-col contain justify-center items-start gap-4">
				<h2 className="text-lg font-bold flex flex-col gap-2 tracking-tight">
					Lista de pedidos ({orderParse.length})
				</h2>
				<p className="text-muted-foreground">
					Detalles del pedido y seguimiento
				</p>
			</div>
			<div className="w-full overflow-hidden">
				<Order
					data={orderParse}
					columns={orderColumnsUser}
					meta={{
						typeTableDashboard: 'customerOrders',
						route: '/orders',
					}}
				/>
			</div>
		</main>
	)
}
