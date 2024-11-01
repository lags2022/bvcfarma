'use client'

import { LabelList, RadialBar, RadialBarChart } from 'recharts'

import { DataPickerShared } from '@/components/shared/dashboard/DataPickerShared'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const description = 'A radial chart with a legend'

const chartData = [
	{ promotion: 'superOferta', orders: 200, fill: 'var(--picker-2)' },
	{ promotion: 'canastas en Oferta', orders: 127, fill: 'var(--picker-3)' },
	{ promotion: 'bonificación', orders: 90, fill: 'var(--picker-5)' },
]

const chartConfig = {
	promotions: {
		label: 'Promotions',
	},
	superOferta: {
		label: 'SuperOferta',
		color: 'var(--picker-2)',
	},
	'canastas en Oferta': {
		label: 'Canastas en Oferta',
		color: 'var(--picker-3)',
	},
	bonificación: {
		label: 'Bonificación',
		color: 'var(--picker-5)',
	},
} satisfies ChartConfig

export const DashboardPromotions = () => {
	return (
		<DashboardWrapperItem>
			<div className="flex flex-col gap-3 justify-between">
				<div className="flex justify-between">
					<div className="text-sm items-center pb-0">
						<h4 className="font-semibold">Gráfica radial - Promociones</h4>
						<h5 className="text-sm font-medium">Enero - Junio 2024</h5>
					</div>
					<DataPickerShared />
				</div>
				<div className="flex-1 pb-0">
					<ChartContainer
						config={chartConfig}
						className="aspect-auto w-full h-[300px] sm:h-[350px]"
					>
						<RadialBarChart
							data={chartData}
							startAngle={-90}
							endAngle={380}
							innerRadius="20%"
							outerRadius="100%"
						>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel nameKey="promotion" />}
							/>
							<RadialBar dataKey="orders" background>
								<LabelList
									position="insideStart"
									dataKey="orders"
									className="fill-white capitalize mix-blend-luminosity"
									fontSize={11}
								/>
							</RadialBar>
							<ChartLegend
								content={<ChartLegendContent nameKey="promotion" />}
								className="translate-y-6 flex-wrap gap-2 [&>*]:justify-center"
							/>
						</RadialBarChart>
					</ChartContainer>
				</div>
				<div className="leading-none mt-8 text-xs text-muted-foreground">
					Mostrando el total de ordenes de los últimos 6 meses.
				</div>
			</div>
		</DashboardWrapperItem>
	)
}
