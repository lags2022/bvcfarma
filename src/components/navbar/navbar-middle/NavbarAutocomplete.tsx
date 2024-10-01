'use client'

import Fuse from 'fuse.js'
import { Check, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Button } from '@/components/ui/button'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ProductApiProps } from '@/interfaces/products'
import { cn } from '@/lib/utils'
import { getProducts } from '@/services/getProducts'

interface AutocompleteInputProps {
	options: ProductApiProps[]
	onSelect: (value: number) => void
	placeholder?: string
	emptyMessage?: string
}

function AutocompleteInput({
	options,
	onSelect,
	placeholder = 'Buscando...',
	emptyMessage = 'Sin resultados',
}: AutocompleteInputProps) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(0)
	const [searchTerm, setSearchTerm] = useState('')
	const [debouncedSearchTerm] = useDebounce(searchTerm, 1000)
	const [filteredOptions, setFilteredOptions] = useState<ProductApiProps[]>([])

	const fuse = useMemo(
		() =>
			new Fuse(options, {
				keys: ['name', 'description'],
				threshold: 0.3, // Ajusta para controlar la sensibilidad de coincidencias
			}),
		[options],
	)

	useEffect(() => {
		if (!debouncedSearchTerm) {
			setFilteredOptions(options)
		} else {
			const results = fuse
				.search(debouncedSearchTerm)
				.map((result) => result.item)
			setFilteredOptions(results)
		}
	}, [debouncedSearchTerm, options, fuse])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						'w-full justify-end sm:justify-between hover:ring-picker-4 transition-all ease-in-out text-base px-2 sm:px-auto border-0 hover:ring-0 sm:hover:ring-1 sm:border sm:border-picker-4 sm:hover:border-picker-4 hover:bg-transparent sm:hover:bg-auto',
					)}
				>
					<p className="hidden sm:block">
						{value ? (
							<span className="hidden xs:block truncate capitalize">
								{options.find((option) => option.id === value)?.name}
							</span>
						) : (
							placeholder
						)}
					</p>
					<SearchIcon className="sm:ml-2 size-5 shrink-0 text-picker-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<CommandDialog open={open} onOpenChange={setOpen}>
					<CommandInput
						placeholder={placeholder}
						value={searchTerm}
						onValueChange={setSearchTerm}
					/>
					<CommandList>
						<CommandEmpty>{emptyMessage}</CommandEmpty>
						<CommandGroup className="max-h-60 overflow-auto">
							{filteredOptions.map((option) => (
								<CommandItem
									key={option.id}
									onSelect={() => {
										setValue(option.id)
										onSelect(option.id)
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === option.id ? 'opacity-100' : 'opacity-0',
										)}
									/>
									<div className="flex items-center capitalize w-full">
										<Image
											src={option.image}
											alt={option.name}
											className="mr-2 h-6 w-6 rounded-full"
											width={24}
											height={24}
										/>
										<div className="flex justify-between w-full">
											<p>{option.name}</p>
											<p className="ml-2">S./ {option.price}</p>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</CommandDialog>
			</PopoverContent>
		</Popover>
	)
}

// Ejemplo de uso
export const NavbarAutocomplete = () => {
	const [options, setOptions] = useState<ProductApiProps[]>([])

	const router = useRouter()

	useEffect(() => {
		const fetch = async () => {
			const products = await getProducts()
			setOptions(products)
		}

		fetch()
	}, [])

	return (
		<div className="w-full m-0">
			<AutocompleteInput
				options={options}
				onSelect={(value) => router.push(`/products/${value}`)}
				placeholder="Buscar productos..."
				emptyMessage="No se encontraron resultados"
			/>
		</div>
	)
}
