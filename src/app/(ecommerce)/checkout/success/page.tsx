import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ChekoutSuccess } from '@/components/checkout/ChekoutSuccess'
import { orderController } from '@/lib/factoryController'

export default async function CheckoutSuccessPage({
	searchParams,
}: {
	searchParams: {
		id: string
	}
}) {
	const orderId = searchParams.id
	const cookieStore = cookies()

	const isPageSuccessCookie = cookieStore.get('success-order')?.value === 'true'

	if (!orderId || !isPageSuccessCookie) {
		redirect('/')
	}

	const order = await orderController().getById(orderId)

	if (!order) {
		notFound()
	}

	return (
		<ChekoutSuccess
			ocNumber={order.ocNumber}
			date={order.paidAt ?? 'Actualizar pago'}
			address={order?.orderAddress?.address!}
			department={order?.orderAddress?.department!}
			province={order?.orderAddress?.province!}
			district={order?.orderAddress?.district!}
			reference={order?.orderAddress?.reference ?? ''}
			phone={order?.orderAddress?.phone!}
			paymentMethod={order?.paymentMethod}
			deliveryType={order?.deliveryType}
			subtotal={order?.totalCart.toFixed(2)}
			shippingCost={order?.shippingCost.toFixed(2)}
			total={order?.total.toFixed(2)}
		/>
	)
}
