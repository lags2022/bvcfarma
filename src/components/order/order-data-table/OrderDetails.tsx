'use client'

import { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { getOrderItems } from '@/actions/order-items'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { DetailsOrder } from '@/components/shared/DetailsOrder'
import { LoaderComponent } from '@/components/shared/Loader'
import { useOrderItemsStore } from '@/context/useOrderItemsStore'
import { smoothScrollToTop } from '@/helpers/smooth-scroll-top'
import { OrderGetAll } from '@/interfaces/orders/order-get-all'

import { OrderStatus } from './OrderStatus'

export const OrderDetails = () => {
	const [setSlideIn, details] = useOrderItemsStore(
		useShallow((state) => [state.setSlideIn, state.details]),
	)

	let cancelScrollAnimationRef = useRef<() => void>()

	const [orderItems, setOrderItems] = useState<OrderGetAll['orderItems']>([])

	useEffect(() => {
		const getOrders = async () => {
			const orderItems = await getOrderItems(details.orderId)
			setOrderItems(orderItems)
		}

		if (details.orderId) {
			getOrders()
			cancelScrollAnimationRef.current = smoothScrollToTop()
		}

		return () => {
			if (cancelScrollAnimationRef.current) {
				cancelScrollAnimationRef.current()
			}
			setOrderItems([])
		}
	}, [details.orderId])

	if (!orderItems || orderItems?.length === 0) {
		return <LoaderComponent />
	}

	return (
		<div className="contain">
			<div className="bg-white shadow-md rounded-lg flex justify-between flex-col sm:flex-row w-full relative p-6 gap-10">
				<ButtonGeneral
					onClick={() => setSlideIn(false)}
					size="icon"
					className="absolute !size-8 right-4 top-4"
				>
					X
				</ButtonGeneral>
				<div className="sm:w-1/2">
					<h3 className="font-semibold mb-4">Productos</h3>
					<DetailsOrder
						productsCart={orderItems}
						subtotal={details.subtotal}
						totalCart={details.totalCart}
						discount={details.discount}
						shippingCost={details.shippingCost}
						totalCheckout={details.totalCheckout}
						typeComponentShopping="checkout"
					/>
				</div>
				<div className="sm:w-1/2">
					<h3 className="font-semibold mb-4">Order Tracking</h3>
					<div className="space-y-6">
						<OrderStatus status={details.status} />
					</div>
				</div>
			</div>
		</div>
	)
}
