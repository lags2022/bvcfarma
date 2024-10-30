'use client'

import { TrendingUp } from 'lucide-react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from 'recharts'

import { DataPickerShared } from '@/components/shared/dashboard/DataPickerShared'
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const description = 'A multiple line chart'

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	mobile: {
		label: 'Mobile',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig

export function DashboardCustomerRate() {
	return (
		<DashboardWrapperItem>
			<div className="flex flex-col justify-between">
				<div className="flex justify-between">
					<div>
						<h4>Line Chart - Multiple</h4>
						<p>January - June 2024</p>
					</div>
					<DataPickerShared />
				</div>
				<div>
					<ChartContainer config={chartConfig}>
						<AreaChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								// tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<YAxis />
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="dot" />}
							/>
							<ChartLegend content={<ChartLegendContent />} />
							<Area
								dataKey="mobile"
								type="natural"
								fill="hsl(var(--chart-5))"
								fillOpacity={0.1}
								stroke="hsl(var(--chart-5))"
								stackId="a"
								strokeWidth={2}
								dot={{
									fill: 'var(--picker-1)',
								}}
								activeDot={{
									r: 6,
								}}
							/>
							<Area
								dataKey="desktop"
								type="natural"
								fill="hsl(var(--chart-2))"
								fillOpacity={0.1}
								stroke="hsl(var(--chart-2))"
								stackId="a"
								strokeWidth={2}
								dot={{
									fill: 'hsl(var(--chart-5))',
								}}
								activeDot={{
									r: 6,
								}}
							/>
						</AreaChart>
					</ChartContainer>
				</div>
				<div>
					<div className="flex w-full items-start gap-2 text-sm">
						<div className="grid gap-2">
							<div className="flex items-center gap-2 font-medium leading-none">
								Trending up by 5.2% this month{' '}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="flex items-center gap-2 leading-none text-muted-foreground">
								Showing total visitors for the last 6 months
							</div>
						</div>
					</div>
				</div>
			</div>
		</DashboardWrapperItem>
	)
}

// En una gráfica, estos términos suelen referirse a métricas de clientes en un negocio:

// Repeat Customer Rate (Tasa de Clientes Recurrentes): Este porcentaje indica la proporción de clientes que regresan a comprar en comparación con los clientes nuevos. Un Repeat Customer Rate alto significa que una gran parte de tus clientes vuelve a comprar, lo cual es positivo para la fidelización.

// New Customer (Cliente Nuevo): Representa a los clientes que compraron por primera vez en un período específico.

// Old Customer (Cliente Antiguo): Son los clientes que han comprado previamente y regresan para realizar otra compra.

// En conjunto, estos datos ayudan a entender la fidelización de clientes y el equilibrio entre clientes nuevos y recurrentes en el negocio. Un análisis de esta gráfica podría ayudar a decidir si se necesita más esfuerzo en adquirir nuevos clientes o en retener los existentes.
