import { getOrdersByUser } from '@/actions/order-action'
import { DashboardWrapperItem } from '@/components/dashboard/DashboardWrapperItem'
import { orderColumnsDashboardOrders } from '@/components/order/order-columns-use-case/orderColumnsUser'
import { Order } from '@/components/order/order-data-table/Order'
import { orderParsed } from '@/schemas/order-data-schema'

export default async function CustomerOrdersPage({
	params,
}: {
	params: { userId: string }
}) {
	const userId = params.userId

	const orders = await getOrdersByUser(userId)

	const ordersParse = orderParsed(orders)

	return (
		<DashboardWrapperItem isTable>
			<Order
				meta={{
					typeTableDashboard: 'ownerDashboardOrders',
					route: '/dashboard/orders',
				}}
				data={ordersParse}
				columns={orderColumnsDashboardOrders}
			/>
		</DashboardWrapperItem>
	)
}
