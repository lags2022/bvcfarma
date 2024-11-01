import { getOrderItems } from '@/actions/order-items'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { cn } from '@/lib/utils'

import { OrderDetails } from './OrderDetails'

export const OrderFetch = async ({
	orderId,
	isPageDashboard,
}: {
	orderId: string
	isPageDashboard?: boolean
}) => {
	const order = await getOrderItems(orderId)

	if (!order)
		return (
			<div className="contain m-auto flex flex-col justify-center items-center gap-6 py-6">
				<div>No se encontraron detalles del pedido.</div>

				<ButtonGeneral href="/">Ir a la página de inicio</ButtonGeneral>
			</div>
		)

	return (
		<main
			className={cn('text-sm', isPageDashboard ? '' : 'py-4 md:py-6 contain')}
		>
			<OrderDetails isPageDashboard={isPageDashboard} order={order} />
		</main>
	)
}
