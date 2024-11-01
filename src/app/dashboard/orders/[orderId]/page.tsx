import { OrderFetch } from '@/components/order/order-data-table/OrderFetch'

export default function PageDashboardOrderDetail({
	params,
}: {
	params: { orderId: string }
}) {
	return <OrderFetch orderId={params.orderId} isPageDashboard />
}
