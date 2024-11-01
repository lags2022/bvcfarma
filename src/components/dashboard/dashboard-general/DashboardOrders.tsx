import { getAllOrders } from '@/actions/order-action'
import { orderColumnsUser } from '@/components/order/order-columns-use-case/orderColumnsUser'
import { Order } from '@/components/order/order-data-table/Order'
import { orderParsed } from '@/schemas/order-data-schema'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const DashboardOrders = async () => {
	const orders = await getAllOrders()

	const ordersParse = orderParsed(orders)

	return (
		<DashboardWrapperItem isTable>
			<Order
				data={ordersParse}
				columns={orderColumnsUser}
				meta={{
					typeTableDashboard: 'ownerDashboard',
					route: '/dashboard/orders',
				}}
			/>
		</DashboardWrapperItem>
	)
}
