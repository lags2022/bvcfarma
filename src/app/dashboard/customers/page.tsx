import { getAllUsers } from '@/actions/user-action'
import { usersColumnsDashboardUsers } from '@/components/dashboard/dashboard-general/columns-table/usersColumns'
import { DashboardWrapperItem } from '@/components/dashboard/DashboardWrapperItem'
import { Order } from '@/components/order/order-data-table/Order'
import { usersParsed } from '@/schemas/users-table-schema'

export default async function PageDashboardCustomers() {
	const users = await getAllUsers()

	const usersParse = usersParsed(users)

	return (
		<DashboardWrapperItem isTable>
			<Order
				meta={{
					typeTableDashboard: 'ownerDashboardOrders',
					route: '/dashboard/customers',
				}}
				data={usersParse}
				columns={usersColumnsDashboardUsers}
			/>
		</DashboardWrapperItem>
	)
}
