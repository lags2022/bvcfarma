import { getAllOrders } from '@/actions/order-action'
import { DashboardWrapperItem } from '@/components/dashboard/DashboardWrapperItem'
import { orderColumnsDashboardOrders } from '@/components/order/order-columns-use-case/orderColumnsUser'
import { Order } from '@/components/order/order-data-table/Order'
import { orderParsed } from '@/schemas/order-data-schema'

export default async function PageDashboardOrders() {
	const orders = await getAllOrders()

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
