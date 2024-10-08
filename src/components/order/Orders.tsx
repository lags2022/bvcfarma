'use client'

import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useOrderItemsStore } from '@/context/useOrderItemsStore'
import { pluralizeWord } from '@/helpers/plurize-word'
import { cn } from '@/lib/utils'
import { OrderSchemaType } from '@/schemas/order-data-schema'

import { orderColumnsUser } from './order-columns-use-case/orderColumnsUser'
import { Order } from './order-data-table/Order'
import { OrderDetails } from './order-data-table/OrderDetails'

export const Orders = ({ data }: { data: OrderSchemaType[] }) => {
	const [slideIn, details, setSlideIn] = useOrderItemsStore(
		useShallow((state) => [state.slideIn, state.details, state.setSlideIn]),
	)

	useEffect(() => {
		setSlideIn(false)

		return () => {
			setSlideIn(false)
		}
	}, [])

	const order = data.find((item) => item.id === details.orderId)

	return (
		<>
			<div className="flex flex-col contain justify-center items-start gap-4">
				<h2 className="text-lg font-bold flex flex-col gap-2 tracking-tight">
					{slideIn
						? `Orden ${order?.ocNumber} | ${pluralizeWord({
								quantity: order?.quantityItems!,
								singular: 'item',
								language: 'en',
							})}`
						: `Lista de pedidos (${data.length})`}
				</h2>
				{!slideIn ? (
					<p className="text-muted-foreground">
						Tabla de pedidos y sus estados
					</p>
				) : (
					<p className="text-muted-foreground">
						Detalles del pedido y seguimiento
					</p>
				)}
			</div>
			<div className="w-full overflow-hidden">
				<div
					className={cn(
						'flex w-[200dvw] overflow-hidden transform duration-700 ease',
						slideIn && '-translate-x-[50%]',
					)}
				>
					<div className="w-[50%] flex-shrink-0 ">
						<Order data={data} columns={orderColumnsUser} />
					</div>
					<div className="w-[50%] flex-shrink-0">
						<OrderDetails />
					</div>
				</div>
			</div>
		</>
	)
}
