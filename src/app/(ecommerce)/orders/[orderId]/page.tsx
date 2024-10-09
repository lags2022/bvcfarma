import { getOrderItems } from '@/actions/order-items'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { OrderDetails } from '@/components/order/order-data-table/OrderDetails'

export default async function PageOrderId({
	params,
}: {
	params: { orderId: string }
}) {
	const order = await getOrderItems(params.orderId)

	if (!order)
		return (
			<div className="contain m-auto flex flex-col justify-center items-center gap-6 py-6">
				<div>No se encontraron detalles del pedido.</div>

				<ButtonGeneral href="/">Ir a la página de inicio</ButtonGeneral>
			</div>
		)

	return (
		<main className="text-sm contain space-y-6 py-4 md:py-6">
			<OrderDetails order={order} />
		</main>
	)
}
