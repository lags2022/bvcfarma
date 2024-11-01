'use client'

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	TableMeta,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import { NoData } from '@/components/svg/Icons'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

import { OrderPagination } from './OrderPagination'
import { OrderToolbar } from './OrderToolbar'
import { RouteTable, TypeTableDashboard } from '@/interfaces/general'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	meta: {
		typeTableDashboard: TypeTableDashboard
		route: RouteTable
	}
}

export function Order<TData, TValue>({
	columns,
	data,
	meta,
}: DataTableProps<TData, TValue>) {
	// const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [globalFilter, setGlobalFilter] = React.useState('') // Establece el filtro global

	const table = useReactTable({
		data,
		columns,
		initialState: {
			pagination: {
				pageSize: meta.typeTableDashboard === 'ownerDashboard' ? 5 : 10,
			},
		},
		state: {
			sorting,
			columnVisibility,
			// rowSelection,
			columnFilters,
			globalFilter, // Inicializa el filtro global
		},
		meta,
		// enableRowSelection: true,
		// onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		onGlobalFilterChange: setGlobalFilter, // Controlador para cambiar el filtro global
		globalFilterFn: 'includesString',
		// globalFilterFn: (row, columnId, filterValue) => {
		// 	if (columnId === 'paymentMethod') {
		// 		return searchWordInsensite(
		// 			filterValue,
		// 			PAYMENT_METHOD_MOD[row.getValue(columnId) as PaymentMethod],
		// 		)
		// 	}
		// 	if (columnId === 'status') {
		// 		return searchWordInsensite(
		// 			filterValue,
		// 			STATUS_ORDER_MOD[row.getValue(columnId) as StatusOrder],
		// 		)
		// 	}

		// 	if (columnId === 'customer') {
		//     // const customer = row.original.orderAddress

		// 	}
		// 	return searchWordInsensite(filterValue, row.getValue('ocNumber'))
		// },
	})

	const isDashboard = ['ownerDashboard', 'ownerDashboardOrders'].includes(
		meta.typeTableDashboard,
	)

	return (
		<div className={!isDashboard ? 'contain space-y-4' : 'space-y-3'}>
			{/* cabecera */}
			<div
				className={cn(
					'flex gap-3 items-center justify-between',
					isDashboard && 'mx-4 md:mx-6',
					meta.typeTableDashboard === 'ownerDashboardOrders' &&
						'flex-col items-start',
				)}
			>
				{isDashboard ? (
					<h4 className="font-semibold">Lista de Órdenes ({data.length})</h4>
				) : null}
				<OrderToolbar
					typeTableDashboard={meta.typeTableDashboard}
					table={table}
				/>
			</div>

			{/* tabla */}
			<div
				className={cn(
					'rounded-md border [&>div]:table-order-scrollbar',
					isDashboard && 'rounded-none border-x-0',
				)}
			>
				<Table className="bg-white dark:bg-black rounded-lg">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length
							? table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										// data-state={row.getIsSelected() && 'selected'}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							: null}
					</TableBody>
				</Table>
				{!table.getRowModel().rows?.length && (
					<div className="m-auto flex flex-col text-center gap-2 items-center justify-center text-xs py-2">
						<NoData className="size-36" />
						No hay resultados.
					</div>
				)}
			</div>
			<OrderPagination isDashboard={isDashboard} table={table} />
		</div>
	)
}
