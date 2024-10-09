import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { SavingsScaleApi } from '@/interfaces/products'

export const ProductSavingsScale = ({
	savingsScale,
}: {
	savingsScale: SavingsScaleApi[]
}) => {
	return (
		<div className="w-full text-xs max-w-xs lg:max-w-none">
			<p className="font-bold mb-2 uppercase">escala de ahorros</p>
			<Table className="text-xs">
				<TableHeader>
					<TableRow className="*:h-8">
						<TableHead className="px-0 w-[63px]">Unidades</TableHead>
						<TableHead>P. Lista (S/)</TableHead>
						<TableHead>Dsct (%)</TableHead>
						<TableHead>P. Final (S/)</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{savingsScale.map((item) => (
						<TableRow key={item.id} className="*:py-1 *:font-medium">
							<TableCell className="px-0 w-[63px]">{item.units}</TableCell>
							<TableCell>
								S./ {parseFloat(item.precio_lista).toFixed(2)}
							</TableCell>
							<TableCell>
								{(parseFloat(item.descuento) * 100).toFixed(0)}%
							</TableCell>
							<TableCell>
								S./ {parseFloat(item.precio_final).toFixed(2)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
