import {
	ArrowDownIcon,
	ArrowUpIcon,
	CaretSortIcon,
	EyeNoneIcon,
	TriangleDownIcon,
	TriangleUpIcon,
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TypeTableDashboard } from '@/interfaces/general'
import { cn } from '@/lib/utils'

export interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>
	title: string
	typeTableDashboard: TypeTableDashboard
}

export function OrderColumnHeader<TData, TValue>({
	column,
	title,
	className,
	typeTableDashboard,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div className={cn(className)}>{title}</div>
	}

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			{typeTableDashboard === 'ownerDashboard' ? (
				<Button
					variant="ghost"
					size="sm"
					className="-ml-3 h-8 data-[state=open]:bg-accent"
					onClick={() => {
						if (column.getIsSorted() === 'asc') {
							column.toggleSorting(true)
						} else if (column.getIsSorted() === 'desc') {
							column.toggleSorting(false)
						} else {
							column.toggleSorting(true)
						}
					}}
				>
					<span className="font-bold">{title}</span>
					{column.getIsSorted() === 'asc' ? (
						<TriangleUpIcon className="ml-2 size-5" />
					) : (
						<TriangleDownIcon className="ml-2 size-5" />
					)}
				</Button>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							size="sm"
							className="-ml-3 h-8 data-[state=open]:bg-accent"
						>
							<span className="font-bold">{title}</span>
							{column.getIsSorted() === 'desc' ? (
								<ArrowDownIcon className="ml-2 h-4 w-4" />
							) : column.getIsSorted() === 'asc' ? (
								<ArrowUpIcon className="ml-2 h-4 w-4" />
							) : (
								<CaretSortIcon className="ml-2 h-4 w-4" />
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuItem onClick={() => column.toggleSorting(false)}>
							<ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Asc
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => column.toggleSorting(true)}>
							<ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Desc
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
							<EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
							Ocultar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
