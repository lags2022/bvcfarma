'use client'

import { ColumnDef } from '@tanstack/react-table'
import { EyeIcon, Trash2 } from 'lucide-react'
import Link from 'next/link'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
// import { modDate } from '@/helpers/mod-date'
// import { pluralizeWord } from '@/helpers/plurize-word'

import { Checkbox } from '@/components/ui/checkbox'
import { OrderColumnHeader } from '@/components/order/order-data-table/OrderColumnHeader'
import Image from 'next/image'
import { UsersSchemaType } from '@/schemas/users-table-schema'
import { AvatarCustom } from '@/components/shared/AvatarCustom'

type CustomColumnDef<TData extends object> = ColumnDef<TData> & {
	alias?: string
}

export const usersColumns: CustomColumnDef<UsersSchemaType>[] = [
	{
		id: 'name',
		accessorKey: 'name',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Nombre"
			/>
		),
		alias: 'Nombre',
		cell: ({ row }) => {
			return (
				<div className="flex gap-2 items-center">
					<AvatarCustom
						name={row.getValue('name')}
						image={row.original?.image}
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
		accessorKey: 'email',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Email"
			/>
		),
		alias: 'Email',
		cell: ({ row }) => {
			return (
				<div className="flex">
					<span className="max-w-56 font-medium">{row.getValue('email')}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
	},
	{
		accessorKey: 'phone',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Teléfono"
			/>
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[100px] items-center">
					<span>{row.getValue('phone')}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
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
		cell: ({ row }) => {
			return (
				<div className="flex w-[100px] items-center">
					<span>{row.getValue('address')}</span>
				</div>
			)
		},

		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		enableGlobalFilter: true,
	},
  {
		accessorKey: 'role',
		header: ({ column, table }) => (
			<OrderColumnHeader
				typeTableDashboard={table.options.meta?.typeTableDashboard!}
				column={column}
				title="Rol"
			/>
		),
		cell: ({ row }) => {
			return (
				<div className="flex w-[100px] items-center">
					<span>{row.getValue('role')}</span>
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

export const usersColumnsDashboardUsers: CustomColumnDef<UsersSchemaType>[] = [
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
	...usersColumns,
]
