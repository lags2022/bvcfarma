import { ClassValue } from 'clsx'
import { Gift, DollarSign, Building2 } from 'lucide-react'

import { ArrowIndicatorDown, ArrowIndicatorUp } from '@/components/svg/Icons'
import { cn } from '@/lib/utils'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

const stats = [
	{
		title: 'Nuevos Pedidos',
		value: '1,390',
		icon: Gift,
		change: '32.40%',
		changeType: 'increase',
		styles: 'text-blue-500 bg-blue-500',
	},
	{
		title: 'Ventas',
		value: '57,890',
		icon: DollarSign,
		change: '4.40%',
		changeType: 'decrease',
		styles: 'text-green-500 bg-green-500',
	},
	{
		title: 'Ingresos',
		value: '12,390',
		icon: Building2,
		change: '32.40%',
		changeType: 'increase',
		styles: 'text-purple-500 bg-purple-500',
	},
]

export const DashboardIndicatorsContainer = () => (
	<>
		{stats.map((stat) => (
			<DashboardIndicator key={stat.title} {...stat} />
		))}
	</>
)

const DashboardIndicator = ({
	title,
	value,
	icon: Icon,
	change,
	changeType,
	styles,
}: {
	title: string
	value: string
	icon: any
	change: string
	changeType: string
	styles: ClassValue
}) => {
	return (
		<DashboardWrapperItem>
			<div className="flex items-center justify-between">
				<div className="flex flex-col items-start pb-1">
					<h4 className="text-sm font-medium">{title}</h4>
					<div className="text-lg font-bold">
						{title === 'Nuevos Pedidos' ? '' : 'S./'} {value}
					</div>
				</div>
				<Icon className={cn(`size-6 !bg-transparent`, styles)} />
			</div>
			<div>
				<div className="my-3 border-t border-dashed" />
				<div
					className={`text-xs flex font-semibold ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}
				>
					{changeType === 'increase' ? (
						<>
							<ArrowIndicatorUp />
							<span>+</span>
						</>
					) : (
						<>
							<ArrowIndicatorDown />
							<span>-</span>
						</>
					)}
					{change} con respecto al último mes.
				</div>
				<div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
					<div
						className={cn(`h-full`, styles)}
						style={{ width: `${Math.abs(parseFloat(change))}%` }}
					/>
				</div>
			</div>
		</DashboardWrapperItem>
	)
}

// Por supuesto, te explicaré cómo calcular el indicador de cambio ("change") para nuevos pedidos, ventas e ingresos en un contexto de comercio electrónico. Este valor generalmente representa la variación porcentual entre dos períodos, comúnmente el mes actual y el mes anterior.

// Nuevos Pedidos: Para calcular el cambio en nuevos pedidos:

// Cambio % = ((Pedidos del mes actual - Pedidos del mes anterior) / Pedidos del mes anterior) * 100
// Ejemplo:

// Mes actual: 1,390 pedidos
// Mes anterior: 1,050 pedidos
// Cambio % = ((1,390 - 1,050) / 1,050) * 100 = 32.38%
// Esto se redondearía a 32.40% como se muestra en la imagen.

// Ventas: Para las ventas, el cálculo es similar, pero usando el valor monetario total de las ventas:

// Cambio % = ((Ventas del mes actual - Ventas del mes anterior) / Ventas del mes anterior) * 100
// Ejemplo:

// Mes actual: $57,890
// Mes anterior: $60,555
// Cambio % = ((57,890 - 60,555) / 60,555) * 100 = -4.40%
// Este es un ejemplo de un cambio negativo, indicando una disminución en las ventas.

// Ingresos: Para los ingresos, que pueden diferir de las ventas si consideras otros factores como devoluciones o descuentos:

// Cambio % = ((Ingresos del mes actual - Ingresos del mes anterior) / Ingresos del mes anterior) * 100
// Ejemplo:

// Mes actual: $12,390
// Mes anterior: $9,358
// Cambio % = ((12,390 - 9,358) / 9,358) * 100 = 32.40%
// Para implementar estos cálculos en tu e-commerce:

// Asegúrate de tener un sistema que registre y almacene datos históricos de pedidos, ventas e ingresos.
// Implementa una función que extraiga los datos del mes actual y del mes anterior.
// Utiliza la fórmula correspondiente para calcular el cambio porcentual.
// Redondea el resultado a dos decimales para una presentación limpia.
// Aquí tienes un ejemplo de cómo podrías implementar esto en JavaScript:

// Este código te permitirá calcular el cambio porcentual para cualquiera de tus métricas de e-commerce. Recuerda que es importante mantener un registro preciso de tus datos históricos para que estos cálculos sean significativos y útiles para tu análisis de negocio.

// Copy

// Retry

// cual es la diferencia entre ventas y los ingresos

// La diferencia entre ventas e ingresos es un concepto importante en el ámbito financiero y de negocios, especialmente en el contexto de comercio electrónico. Aunque a menudo se usan de manera intercambiable en el lenguaje cotidiano, tienen significados distintos en términos contables. Vamos a explicar cada uno:

// Ventas (Sales):

// Las ventas se refieren al valor total de los bienes o servicios vendidos por una empresa en un período determinado.
// Este es el monto bruto generado por las transacciones de venta, antes de cualquier deducción.
// En un e-commerce, las ventas serían la suma de todos los pedidos procesados, independientemente de si han sido pagados, enviados o devueltos.
// Ingresos (Revenue):

// Los ingresos representan el dinero que realmente entra en la empresa después de considerar ciertas deducciones de las ventas.
// Incluye el dinero ganado de todas las fuentes, no solo de la venta de productos o servicios principales.
// En contabilidad, los ingresos se reconocen cuando se han cumplido ciertas condiciones, como la entrega del producto o la prestación del servicio.
// Principales diferencias:

// Deducciones:

// Las ventas no tienen en cuenta las devoluciones, descuentos o cancelaciones.
// Los ingresos sí consideran estas deducciones, reflejando una imagen más precisa del dinero que realmente ingresa a la empresa.
// Reconocimiento:

// Las ventas se registran en el momento de la transacción.
// Los ingresos se reconocen cuando se cumplen ciertos criterios contables, que pueden variar según las políticas de la empresa y las normas contables aplicables.
// Alcance:

// Las ventas se limitan a las transacciones principales del negocio.
// Los ingresos pueden incluir otras fuentes de entrada de dinero, como intereses, regalías o ingresos por inversiones.
// Ejemplo en un e-commerce:

// Supongamos que tienes una tienda online de ropa:

// Ventas totales del mes: $100,000

// Esto representa el valor total de todos los pedidos realizados.
// Ingresos del mes: $85,000

// Esto podría resultar después de considerar:

// Devoluciones: $10,000
// Descuentos aplicados: $5,000
// Ingresos por envío: $2,000
// Cancelaciones: $2,000
// En este caso, aunque las ventas fueron de $100,000, los ingresos reales son menores debido a las devoluciones y descuentos, pero también incluyen ingresos adicionales por envío.

// Para un e-commerce, es crucial monitorear ambos valores:

// Las ventas dan una idea del volumen de transacciones y la demanda de productos.
// Los ingresos proporcionan una visión más precisa del rendimiento financiero real del negocio.
// Entender esta diferencia es fundamental para una gestión financiera efectiva y para tomar decisiones informadas sobre el negocio.
