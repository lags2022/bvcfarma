'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPaymentMethod, formatStatusOrder } from '@/helpers/enum-mod'
import { TypeTableDashboard } from '@/interfaces/general'
import { cn } from '@/lib/utils'

import { OrderFacetedFilter } from './OrderFacetedFilter'
import { OrderViewOptions } from './OrderViewOptions'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	typeTableDashboard?: TypeTableDashboard
}

export function OrderToolbar<TData>({
	table,
	typeTableDashboard,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className="flex flex-1 flex-col sm:flex-row gap-3 sm:items-center w-full justify-between">
			<div
				className={cn(
					'flex flex-1 items-center space-x-2',
					typeTableDashboard === 'ownerDashboard' && 'justify-end',
				)}
			>
				<Input
					placeholder="Buscar..."
					// value={(table.getColumn('ocNumber')?.getFilterValue() as string) ?? ''}
					// onChange={(event) =>
					// 	table.getColumn('ocNumber')?.setFilterValue(event.target.value)
					// }
					value={table.getState().globalFilter ?? ''} // Usa el filtro global del estado de la tabla
					onChange={(event) => table.setGlobalFilter(event.target.value)} // Cambia el filtro global en lugar de uno específico
					className="h-8 max-w-xs"
				/>
			</div>
			{typeTableDashboard !== 'ownerDashboard' && (
				<div className="flex items-center space-x-2">
					{isFiltered && (
						<Button
							variant="ghost"
							onClick={() => table.resetColumnFilters()}
							className="h-8 px-2 lg:px-3"
						>
							Reset
							<Cross2Icon className="ml-2 h-4 w-4" />
						</Button>
					)}
					{table.getColumn('status') && (
						<OrderFacetedFilter
							column={table.getColumn('status')}
							title="Estado"
							options={formatStatusOrder}
						/>
					)}
					{table.getColumn('paymentMethod') && (
						<OrderFacetedFilter
							column={table.getColumn('paymentMethod')}
							title="Tipo de pago"
							options={formatPaymentMethod}
						/>
					)}
					<OrderViewOptions table={table} />
				</div>
			)}
		</div>
	)
}
