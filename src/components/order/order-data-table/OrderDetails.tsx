'use client'

import { Order, OrderItemProduct } from '@prisma/client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { DashboardWrapperItem } from '@/components/dashboard/DashboardWrapperItem'
import { DetailsOrder } from '@/components/shared/DetailsOrder'
import { STATUS_ORDER_MOD } from '@/constants/enum-mod'
import { pluralizeWord } from '@/helpers/plurize-word'
import { smoothScrollToTop } from '@/helpers/smooth-scroll-top'

import { OrderStatus } from './OrderStatus'

export const OrderDetails = ({
	order: order,
	isPageDashboard,
}: {
	order: Order & {
		orderItems?: OrderItemProduct[]
	}
	isPageDashboard?: boolean
}) => {
	const router = useRouter()

	useEffect(() => {
		const cancelScrollAnimation = smoothScrollToTop()

		return () => {
			cancelScrollAnimation()
		}
	}, [])

	return (
		<div className="w-full space-y-4">
			<div className="flex flex-col justify-center items-start gap-4">
				<div className="flex justify-center items-center gap-2">
					<ButtonGeneral
						// href={isPageDashboard ? '/dashboard/orders' : '/orders'}
						onClick={() => router.back()}
						size="icon"
					>
						<ArrowLeft />
					</ButtonGeneral>
					<h2 className="text-lg font-bold flex flex-col gap-2 tracking-tight">
						Orden {order.ocNumber} |{' '}
						{pluralizeWord({
							quantity: order.quantityItems,
							singular: 'item',
							language: 'en',
						})}
					</h2>
				</div>
				<p className="text-muted-foreground">
					Detalles del pedido y seguimiento
				</p>
			</div>
			<DashboardWrapperItem>
				<div className="flex justify-between flex-col sm:flex-row w-full gap-6">
					<div className="sm:w-1/2">
						<h3 className="font-semibold mb-4">Productos</h3>
						<DetailsOrder
							productsCart={order.orderItems!}
							subtotal={order.subtotal}
							totalCart={order.totalCart}
							discount={order.discount}
							shippingCost={order.shippingCost}
							totalCheckout={order.total}
							typeComponentShopping="checkout"
						/>
					</div>
					<div className="sm:w-1/2">
						<h3 className="font-semibold mb-4">Order Tracking</h3>
						<div className="space-y-6">
							<OrderStatus status={STATUS_ORDER_MOD[order.status]} />
						</div>
					</div>
				</div>
			</DashboardWrapperItem>
		</div>
	)
}
