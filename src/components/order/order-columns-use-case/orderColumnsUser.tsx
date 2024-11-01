'use client'

import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Checkbox } from '@/components/ui/checkbox'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { modDate } from '@/helpers/mod-date'
import { pluralizeWord } from '@/helpers/plurize-word'
import { OrderSchemaType } from '@/schemas/order-data-schema'

import { OrderColumnHeader } from '../order-data-table/OrderColumnHeader'

type CustomColumnDef<TData extends object> = ColumnDef<TData> & {
	alias?: string
}

export const orderColumnsUser: CustomColumnDef<OrderSchemaType>[] = [
	{
		accessorKey: 'ocNumber',
		header: ({ column, table }) => {
			return (
				<OrderColumnHeader
					typeTableDashboard={table.options.meta?.typeTableDashboard!}
					column={column}
					title="Order ID"
				/>
			)
		},
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Comprador"
			/>
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Dirección"
			/>
		),
		alias: 'Dirección',
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-56 truncate font-medium flex flex-col">
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Estado"
			/>
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Fecha de pago"
			/>
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Tipo de pago"
			/>
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Total"
			/>
		),
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
		header: ({ column, table }) => (
			<OrderColumnHeader
				column={column}
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				className="font-bold"
				title=""
			/>
		),
		cell: ({ row, table }) => {
			return (
				<div className="flex items-center gap-2 justify-center">
					<Link href={`${table.options.meta?.route}/${row.original.id}`}>
						<TooltipProvider delayDuration={0}>
							<Tooltip>
								<TooltipTrigger className="p-2 rounded-sm border border-border transition-[background] ease duration-300 group hover:bg-picker-4">
									<EyeIcon className="size-4 transition-colors ease duration-300 group-hover:text-white" />
								</TooltipTrigger>
								<TooltipContent align="center">Detalles</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</Link>
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger className="p-2 rounded-sm border border-border transition-[background] ease duration-300 group hover:bg-picker-4">
								<Trash2 className="size-4 transition-colors ease duration-300 group-hover:text-white" />
							</TooltipTrigger>
							<TooltipContent align="center">Eliminar</TooltipContent>
						</Tooltip>
					</TooltipProvider>
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

export const orderColumnsDashboardOrders: CustomColumnDef<OrderSchemaType>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
		enableGlobalFilter: false,
	},
	...orderColumnsUser,
]
