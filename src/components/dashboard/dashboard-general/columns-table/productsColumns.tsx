'use client'

// import { modDate } from '@/helpers/mod-date'
// import { pluralizeWord } from '@/helpers/plurize-word'
import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { OrderColumnHeader } from '@/components/order/order-data-table/OrderColumnHeader'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { ProductsSchemaType } from '@/schemas/products-table-schema'

type CustomColumnDef<TData extends object> = ColumnDef<TData> & {
	alias?: string
}

export const productsColumns: CustomColumnDef<ProductsSchemaType>[] = [
	{
		id: 'name',
		accessorKey: 'name',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Producto"
			/>
		),
		alias: 'Producto',
		cell: ({ row }) => {
			return (
				<div className="flex gap-2 items-center">
					<Image
						src={row.original.image}
						alt={row.getValue('name')}
						width={50}
						height={50}
						className="rounded-md aspect-square size-8 object-cover"
					/>
					<span className="max-w-[250px] capitalize truncate font-medium">
						{row.getValue('name')}
					</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'price',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Precio"
			/>
		),
		alias: 'Precio',
		cell: ({ row }) => {
			return (
				<div className="flex">
					<span className="max-w-56 font-medium">{row.getValue('price')}</span>
				</div>
			)
		},
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'stock',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Stock"
			/>
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[100px] items-center">
					<span>{row.getValue('stock')}</span>
				</div>
			)
		},
		enableGlobalFilter: false,
	},
	{
		accessorKey: 'typeOffer',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Tipo de Oferta"
			/>
		),
		cell: ({ row }) => {
			return (
				<div className="flex">
					<span className="max-w-[100px] capitalize truncate font-medium">
						{row.getValue('typeOffer')}
					</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'typeProduct',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Tipo"
			/>
		),
		cell: ({ row }) => {
			return (
				<div className="flex">
					<span className="max-w-[100px] truncate capitalize font-medium">
						{row.getValue('typeProduct')}
					</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
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
]

export const productsColumnsDashboardProduct: CustomColumnDef<ProductsSchemaType>[] =
	[
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
		...productsColumns,
	]
