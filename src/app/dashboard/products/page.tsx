import { productsColumnsDashboardProduct } from '@/components/dashboard/dashboard-general/columns-table/productsColumns'
import { DashboardWrapperItem } from '@/components/dashboard/DashboardWrapperItem'
import { Order } from '@/components/order/order-data-table/Order'
import { productsParsed } from '@/schemas/products-table-schema'
import { getProducts } from '@/services/getProducts'

export default async function PageDashboardProducts() {
	const products = await getProducts()

	const productsParse = productsParsed(products)

	return (
		<DashboardWrapperItem isTable>
			<Order
				meta={{
					typeTableDashboard: 'ownerDashboardOrders',
					route: '/dashboard/products',
				}}
				data={productsParse}
				columns={productsColumnsDashboardProduct}
			/>
		</DashboardWrapperItem>
	)
}
