import { getAllOrders } from '@/actions/order-action'
import { DashboardWrapperItem } from '@/components/dashboard/DashboardWrapperItem'
import { orderColumnsUser } from '@/components/order/order-columns-use-case/orderColumnsUser'
import { Order } from '@/components/order/order-data-table/Order'
import { orderParsed } from '@/schemas/order-data-schema'

export default async function PageDashboardOrders() {
	const orders = await getAllOrders()

	const ordersParse = orderParsed(orders)

	return (
		<div>
			<h1>Dashboard Orders</h1>
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
		</div>
	)
}
