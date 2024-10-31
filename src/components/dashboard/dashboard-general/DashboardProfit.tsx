'use client'

import { TrendingUp } from 'lucide-react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	LabelList,
	XAxis,
	YAxis,
} from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

const timePeriodsData = {
	'5D': [
		{ date: 'Mon', profit: 7500 },
		{ date: 'Tue', profit: 8200 },
		{ date: 'Wed', profit: 7800 },
		{ date: 'Thu', profit: 8950 },
		{ date: 'Fri', profit: 8500 },
	],
	'2W': [
		{ date: 'Week 1', profit: 7500 },
		{ date: 'Week 2', profit: 8950 },
	],
	'1M': [
		{ date: 'Week 1', profit: 7200 },
		{ date: 'Week 2', profit: 7800 },
		{ date: 'Week 3', profit: 8400 },
		{ date: 'Week 4', profit: 8950 },
	],
	'6M': [
		{ date: 'Jan', profit: 6500 },
		{ date: 'Feb', profit: 7200 },
		{ date: 'Mar', profit: 7800 },
		{ date: 'Apr', profit: 8100 },
		{ date: 'May', profit: 8500 },
		{ date: 'Jun', profit: 8950 },
	],
	'1Y': [
		{ date: 'Jul', profit: 5500 },
		{ date: 'Aug', profit: 6000 },
		{ date: 'Sep', profit: 6500 },
		{ date: 'Oct', profit: 7200 },
		{ date: 'Nov', profit: 7800 },
		{ date: 'Dec', profit: 8100 },
		{ date: 'Jan', profit: 8300 },
		{ date: 'Feb', profit: 8500 },
		{ date: 'Mar', profit: 8700 },
		{ date: 'Apr', profit: 8800 },
		{ date: 'May', profit: 8900 },
		{ date: 'Jun', profit: 8950 },
	],
}

const chartConfig = {
	profit: {
		label: 'Ganancia',
		color: 'var(--picker-3)',
	},
}

export const DashboardProfit = () => {
	return (
		<DashboardWrapperItem>
			<div className="flex flex-col h-full justify-between gap-3">
				<div>
					<h4 className="font-semibold">Total Ganancias</h4>
					<h5 className="text-lg font-bold">S./ 8,950.00</h5>
				</div>
				<Tabs
					defaultValue="5D"
					className="flex flex-col flex-1 justify-between w-full"
				>
					<TabsList className="w-full flex justify-around">
						<TabsTrigger value="5D">5 D</TabsTrigger>
						<TabsTrigger value="2W">2 W</TabsTrigger>
						<TabsTrigger value="1M">1 M</TabsTrigger>
						<TabsTrigger value="6M">6 M</TabsTrigger>
						<TabsTrigger value="1Y">1 Y</TabsTrigger>
					</TabsList>
					{Object.entries(timePeriodsData).map(([period, data]) => (
						<TabsContent key={period} value={period} className="w-full">
							<ChartContainer config={chartConfig} className="aspect-auto w-full h-[250px]">
								<AreaChart
									data={data}
									margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
								>
									<CartesianGrid vertical={false} strokeDasharray={'3 3'} />
									<XAxis
										dataKey="date"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/>
									{/* <YAxis
										dataKey="profit"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
									/> */}
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="line" />}
									/>
									<defs>
										<linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--picker-3)"
												stopOpacity={0.8}
											/>
											<stop
												offset="95%"
												stopColor="var(--picker-3)"
												stopOpacity={0.1}
											/>
										</linearGradient>
									</defs>
									<Area
										type="natural"
										dataKey="profit"
										stroke="var(--picker-3)"
										fill="url(#fillColor)"
										fillOpacity={0.4}
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
									</Area>
								</AreaChart>
							</ChartContainer>
							<div className="flex flex-col gap-2 text-xs text-muted-foreground">
								<div className="flex gap-1">
									<TrendingUp className="h-4 w-4 text-green-500 text-success" />
									<span className="text-green-500 font-semibold">
										+5.2% del periodo anterior
									</span>
								</div>
								<p className="text-xs text-muted-foreground">
									Beneficio total sin impuestos incluidos.
								</p>
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</DashboardWrapperItem>
	)
}

// "Profit" significa "beneficio" o "ganancia" en español. Es el dinero que queda después de restar todos los gastos de los ingresos totales de un negocio.

// Por ejemplo:

// - Si vendes algo por $100 (ingreso)
// - Y te costó $60 producirlo (gasto)
// - Tu profit (ganancia/beneficio) sería $40

// En el gráfico que vimos anteriormente, el "Total Profit" de $8,950.00 representa la ganancia total del negocio, y como indica la nota al pie, este monto es sin incluir impuestos ("Total profit without tax included").

// Los diferentes períodos de tiempo (5D, 2W, 1M, 6M, 1Y, All time) permiten ver cómo ha evolucionado esta ganancia a lo largo del tiempo:

// - 5D = últimos 5 días
// - 2W = últimas 2 semanas
// - 1M = último mes
// - 6M = últimos 6 meses
// - 1Y = último año
// - All time = todo el tiempo
