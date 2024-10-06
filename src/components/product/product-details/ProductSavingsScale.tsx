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
							<TableCell>S./ {item.precio_lista}</TableCell>
							<TableCell>{parseFloat(item.descuento) * 100}</TableCell>
							<TableCell>S./ {item.precio_final}</TableCell>
						</TableRow>
					))}
					{/* <TableRow>
						<TableCell>2 a más</TableCell>
						<TableCell>S/ 3.40</TableCell>
						<TableCell>16</TableCell>
						<TableCell>S/ 2.86</TableCell>
					</TableRow> */}
				</TableBody>
			</Table>
		</div>
	)
}
