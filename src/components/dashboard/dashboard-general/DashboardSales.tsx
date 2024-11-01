'use client'

import { TrendingUp } from 'lucide-react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ComposedChart,
	LabelList,
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

export const description = 'A stacked bar chart with a legend'

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

export const DashboardSales = () => {
	return (
		<DashboardWrapperItem>
			<div className="flex flex-col gap-3 h-full justify-between">
				<div className="flex justify-between">
					<div>
						<h4 className="font-semibold">Informe de ingresos por ventas</h4>
						<h5 className="text-sm font-medium">Enero - Junio 2024</h5>
					</div>
					<DataPickerShared />
				</div>
				<div>
					<ChartContainer config={chartConfig} className='aspect-auto w-full h-[300px] sm:h-[350px]'>
						<ComposedChart
							accessibilityLayer
							margin={{
								left: -20,
								right: 12,
							}}
							data={chartData}
						>
							<CartesianGrid
								vertical={false}
								// strokeWidth={2}
								stroke="hsl(var(--border))"
								strokeDasharray={'5 5'}
							/>
							<XAxis
								dataKey="month"
								// tickLine={false} // la linea vertical de cada label del eje no se visualiza
								tickMargin={10}
								// axisLine={false} // la linea horizontal del eje no se visualiza
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<YAxis tickMargin={8} tickCount={5} />
							<ChartTooltip
								cursor={false} // la linea vertical de cada barra del eje no se visualiza
								content={<ChartTooltipContent hideLabel />}
							/>
							<ChartLegend content={<ChartLegendContent />} />
							<Bar
								dataKey="desktop"
								stackId="a"
								fill="var(--picker-2)"
								radius={[0, 0, 4, 4]}
                barSize={50}
							/>
							<Bar
								dataKey="mobile"
								stackId="a"
								fill="var(--picker-3)"
								radius={[4, 4, 0, 0]}
                barSize={50}
							/>
							<Line
								dataKey="desktop"
								type="natural"
								stroke="var(--picker-5)"
								strokeWidth={2}
								dot={{
									fill: 'var(--picker-1)',
								}}
								activeDot={{
									r: 6,
								}}
							>
								<LabelList
									position="top"
									offset={12}
									className="fill-foreground"
									fontSize={12}
								/>
							</Line>
						</ComposedChart>
					</ChartContainer>
				</div>
				<div className="flex-col items-start gap-2 text-sm">
					<div className="flex gap-2 font-medium leading-none">
						Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
					</div>
					<div className="leading-none text-muted-foreground">
						Showing total visitors for the last 6 months
					</div>
				</div>
			</div>
		</DashboardWrapperItem>
	)
}

// "Sales report revenue" significa "informe de ingresos por ventas" en español. Es un reporte o gráfico que muestra el dinero que una empresa ha ganado a través de sus ventas durante un período específico. En este gráfico:

// - Las barras azules oscuras muestran los ingresos (revenue)
// - Las barras azules claras muestran los gastos (expenses)
// - La línea morada muestra la tendencia de los ingresos a lo largo del tiempo
// - Los valores están en dólares, desde $0 hasta $12,000
// - Los datos están organizados por mes, de enero a diciembre
