'use client'

import { PaymentMethod, StatusOrder } from '@prisma/client'
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
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

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { OrderPagination } from './OrderPagination'
import { OrderToolbar } from './OrderToolbar'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function Order<TData, TValue>({
	columns,
	data,
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
		state: {
			sorting,
			columnVisibility,
			// rowSelection,
			columnFilters,
			globalFilter, // Inicializa el filtro global
		},
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

	return (
		<div className="space-y-4 px-6">
			<OrderToolbar table={table} />
			<div className="rounded-md border">
				<Table>
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
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
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
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No hay resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<OrderPagination table={table} />
		</div>
	)
}
