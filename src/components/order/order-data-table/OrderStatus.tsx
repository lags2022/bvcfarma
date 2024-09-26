import { Truck, Package, Home, CircleX, LucideProps, Check } from 'lucide-react'
import { createElement, ForwardRefExoticComponent, RefAttributes } from 'react'

import { cn } from '@/lib/utils'

interface OrderStep {
	id: number
	status: string
	completed: boolean
	icon: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	>
}

const orderSteps: OrderStep[] = [
	{
		id: 1,
		status: 'Validando',
		completed: false,
		icon: Check,
	},
	{
		id: 2,
		status: 'Preparando',
		completed: false,
		icon: Package,
	},
	{
		id: 3,
		status: 'Asignado',
		completed: false,
		icon: Truck,
	},
	{
		id: 4,
		status: 'Entregado',
		completed: false,
		icon: Home,
	},
]

const OrderStatusCanceled = () => {
	return (
		<div>
			<div className="flex items-center space-x-4">
				<CircleX className="w-6 h-6 text-red-500" />
				<span className="text-red-500 font-semibold">Cancelado</span>
			</div>
		</div>
	)
}

export const OrderStatus = ({ status }: { status: string }) => {
	const idStatus = orderSteps.find((item) => item.status === status)?.id

	if (!idStatus) {
		return <OrderStatusCanceled />
	}

	const orderStatusMod = orderSteps.map((step) =>
		step.id <= idStatus
			? {
					...step,
					completed: true,
				}
			: step,
	)

	return (
		<div className="">
			{status === 'Cancelado' ? (
				<OrderStatusCanceled />
			) : (
				<>
					{orderStatusMod.map(({ id, status, completed, icon }, index) => (
						<div key={index} className="flex items-start">
							<div className="flex flex-col items-center mr-4">
								{completed ? (
									<div
										className={cn(
											'size-6 flex justify-center items-center ring-2 ring-picker-3 rounded-full [&>*]:size-5',
											completed ? '[&>*]:text-picker-3' : '[&>*]:text-gray-300',
										)}
									>
										{createElement(icon)}
									</div>
								) : (
									<>
										{idStatus + 1 >= id && (
											<div className="size-6 flex justify-center items-center ring-2 ring-gray-300 rounded-full"></div>
										)}
									</>
								)}
								{index < orderSteps.length - 1 && idStatus >= id && (
									<div className="relative w-0.5 h-11">
										<div
											className={cn(
												'absolute top-0 w-0.5 h-full bg-picker-3 z-10',
												idStatus === id && 'h-[1.375rem]',
											)}
										/>
										<div className="absolute bottom-0 w-0.5 h-[1.375rem] bg-gray-300" />
									</div>
								)}
							</div>
							<div>
								{idStatus + 1 >= id && (
									<p
										className={cn(
											'font-medium',
											completed ? 'text-picker-3' : 'text-gray-300',
										)}
									>
										{status}
									</p>
								)}
							</div>
						</div>
					))}
				</>
			)}
		</div>
	)
}
