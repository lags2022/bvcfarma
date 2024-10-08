'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowBigRight } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { useOrderItemsStore } from '@/context/useOrderItemsStore'
import { modDate } from '@/helpers/mod-date'
import { pluralizeWord } from '@/helpers/plurize-word'
import { OrderSchemaType } from '@/schemas/order-data-schema'

import { OrderColumnHeader } from '../order-data-table/OrderColumnHeader'
// import { Checkbox } from '@/components/ui/checkbox'
// import { OrderRowActions } from './order-data-table/no-used/OrderRowActions'

type CustomColumnDef<TData extends object> = ColumnDef<TData> & {
	alias?: string
}

export const orderColumnsUser: CustomColumnDef<OrderSchemaType>[] = [
	// {
	// 	id: 'select',
	// 	header: ({ table }) => (
	// 		<Checkbox
	// 			checked={
	// 				table.getIsAllPageRowsSelected() ||
	// 				(table.getIsSomePageRowsSelected() && 'indeterminate')
	// 			}
	// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
	// 			aria-label="Select all"
	// 			className="translate-y-[2px]"
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<Checkbox
	// 			checked={row.getIsSelected()}
	// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
	// 			aria-label="Select row"
	// 			className="translate-y-[2px]"
	// 		/>
	// 	),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	{
		accessorKey: 'ocNumber',
		header: ({ column }) => (
			<OrderColumnHeader column={column} title="Order ID" />
		),
		alias: 'Order ID',
		cell: ({ row }) => (
			<div className="flex flex-col">
				{row.getValue('ocNumber')}{' '}
				<span className="text-gray-500">
					{pluralizeWord({
						quantity: row.original.quantityItems,
						singular: 'item',
						language: 'en',
					})}
				</span>
			</div>
		),
		enableGlobalFilter: true,
	},
	{
		id: 'customer',
		accessorKey: 'customer',
		header: ({ column }) => (
			<OrderColumnHeader column={column} title="Comprador" />
		),
		alias: 'Comprador',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[100px] truncate font-medium">
						{row.getValue('customer')}
					</span>
				</div>
			)
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'address',
		header: ({ column }) => (
			<OrderColumnHeader column={column} title="Dirección" />
		),
		alias: 'Dirección',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-sm truncate font-medium flex flex-col">
						{row.getValue('address')}
						<span className="text-xs text-muted-foreground">
							{row.original.deliveryType}
						</span>
					</span>
				</div>
			)
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<OrderColumnHeader column={column} title="Estado" />
		),
		cell: ({ row }) => {
			// const status = formatStatusOrder.find(
			// 	(status) => status.value === row.getValue('status'),
			// )

			// if (!status) {
			// 	return null
			// }

			return (
				<div className="flex w-[100px] items-center">
					{/* {status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)} */}
					<span>{row.getValue('status')}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'paidAt',
		header: ({ column }) => (
			<OrderColumnHeader column={column} title="Fecha de pago" />
		),
		alias: 'Fecha de pago',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue('paidAt')
							? modDate(row.getValue('paidAt'), 'full')
							: 'Actualizar pago'}
					</span>
				</div>
			)
		},
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'paymentMethod',
		header: ({ column }) => (
			<OrderColumnHeader column={column} title="Tipo de pago" />
		),
		alias: 'Tipo de pago',
		cell: ({ row }) => {
			return (
				<div className="flex w-[100px] items-center">
					{/* {status.icon && (
						<status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
					)} */}
					<span className="capitalize">{row.getValue('paymentMethod')}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'total',
		header: ({ column }) => <OrderColumnHeader column={column} title="Total" />,
		alias: 'Total',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						S./ {row.getValue('total')}
					</span>
				</div>
			)
		},
		enableGlobalFilter: false,
	},
	{
		id: 'details',
		header: ({ column }) => (
			<OrderColumnHeader column={column} className='font-bold' title="Detalles" />
		),
		cell: function Cell({ row }) {
			const [setSlideIn, setDetails] = useOrderItemsStore(
				useShallow((state) => [state.setSlideIn, state.setDetails]),
			)

			return (
				<div className="flex space-x-2 items-center justify-center">
					<ButtonGeneral
						onClick={() => {
							setSlideIn(true)
							setDetails({
								orderId: row.original.id,
								discount: row.original.discount,
								shippingCost: row.original.shippingCost,
								subtotal: row.original.subtotal,
								totalCart: row.original.totalCart,
								totalCheckout: row.original.total,
								status: row.original.status,
							})
						}}
						size="icon"
					>
						<ArrowBigRight className="size-4" />
					</ButtonGeneral>
				</div>
			)
		},
		enableGlobalFilter: false,
		enableSorting: false,
		enableHiding: false,
	},

	// {
	// 	id: 'actions',
	// 	cell: ({ row }) => <OrderDataTableRowActions row={row} />,
	// },
]
