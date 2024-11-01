import { Order } from '@/components/order/order-data-table/Order'
import { productsParsed } from '@/schemas/products-table-schema'
import { getProducts } from '@/services/getProducts'

import { productsColumns } from './columns-table/productsColumns'
import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const DashboardStock = async () => {
	const products = await getProducts()

	const productsParse = productsParsed(products)

	return (
		<DashboardWrapperItem isTable>
			<Order
				data={productsParse}
				columns={productsColumns}
				meta={{
					typeTableDashboard: 'ownerDashboard',
					route: '/dashboard/products',
				}}
			/>
		</DashboardWrapperItem>
	)
}
