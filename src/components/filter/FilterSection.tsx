import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FilterState, FilterTypes } from '@/context/useFilterStore'
import { cn } from '@/lib/utils'

export function FilterSection({
	title,
	items,
	value,
	toogleFilter,
}: {
	title: string
	items:
		| FilterState['tipos']
		| FilterState['categories']
		| FilterState['subCategories']
		| FilterState['lines']

	value: FilterTypes
	toogleFilter: (type: FilterTypes, id: number) => void
}) {
	return (
		<AccordionItem value={value}>
			<AccordionTrigger className="px-4 py-2 text-sm font-medium">
				{title}
			</AccordionTrigger>
			<AccordionContent>
				<ScrollArea className="h-[160px] px-4 py-2">
					{items.map((item) => (
						<div
							key={item.id}
							className={cn(
								'flex items-center space-x-2 py-1',
								!item.count && 'hidden',
							)}
						>
							<Checkbox
								id={item.name}
								checked={item.isSelected}
								onCheckedChange={() => toogleFilter(value, item.id)}
							/>
							<label
								htmlFor={item.name}
								className="capitalize text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{item.name} ({item.count})
							</label>
						</div>
					))}
				</ScrollArea>
			</AccordionContent>
		</AccordionItem>
	)
}
