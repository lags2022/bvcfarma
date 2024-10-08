'use client'

import { useState } from 'react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const ProductDescription = ({
	description,
}: {
	description: string
}) => {
	const [openItem, setOpenItem] = useState<string | undefined>()

	const handleExpandItem = (item: string) => {
		setOpenItem((prevItem) => (prevItem === item ? undefined : item))
	}

	const descriptionLabels = [
		{
			id: 1,
			label: 'descripción',
			content: description,
		},
		{
			id: 2,
			label: 'especificaciones',
			content: 'Esta es la descripción del producto',
		},
		{
			id: 3,
			label: 'reseñas',
			content: 'Estas son las reseñas del producto',
		},
		{
			id: 4,
			label: 'cómo usar',
			content: 'Esta son las instrucciones para usar el producto',
		},
	]

	return (
		<>
			<Tabs className="hidden md:block" defaultValue="descripción">
				<TabsList className="bg-gray-200">
					{descriptionLabels.map((item) => (
						<TabsTrigger
							key={item.id}
							value={item.label}
							onClick={() => handleExpandItem(item.label)}
							className="capitalize"
						>
							{item.label}
						</TabsTrigger>
					))}
				</TabsList>
				{descriptionLabels.map((item) => (
					<TabsContent key={item.id} value={item.label}>
						{item.content}
					</TabsContent>
				))}
			</Tabs>
			<Accordion
				type="single"
				value={openItem}
				onValueChange={setOpenItem}
				className="w-full max-w-xs block md:hidden"
				collapsible
			>
				{descriptionLabels.map((item) => (
					<AccordionItem key={item.id} value={item.label}>
						<AccordionTrigger className="text-base font-semibold px-6 py-4">
							<span className="capitalize flex items-center">{item.label}</span>
						</AccordionTrigger>
						<AccordionContent className="px-6 pb-4">
							<div className="text-sm text-muted-foreground">
								<p>{item.content}</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</>
	)
}
