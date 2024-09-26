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
			<div className="flex flex-col justify-center items-start gap-4">
				<h2 className="text-lg font-bold tracking-tight">
					{slideIn
						? `Orden ${order?.ocNumber} | ${pluralizeWord({
								quantity: order?.quantityItems!,
								singular: 'item',
								language: 'en',
							})}`
						: `Lista de pedidos (${data.length})`}
				</h2>
				{!slideIn && (
					<p className="text-muted-foreground">
						Aquí podras darle seguimiento a tus pedidos y sus estados.
					</p>
				)}
			</div>
			<div
				className={cn(
					'flex w-full transform duration-700 ease',
					slideIn && '-translate-x-full',
				)}
			>
				<div className="w-[calc(100vw-7px)] flex-shrink-0 ">
					<Order data={data} columns={orderColumnsUser} />
				</div>
				<div className="w-[calc(100vw-7px)] flex-shrink-0">
					<OrderDetails />
				</div>
			</div>
		</>
	)
}
