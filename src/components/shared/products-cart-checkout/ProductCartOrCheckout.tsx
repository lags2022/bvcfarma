import Image from 'next/image'

import { useCartStore } from '@/context/useCartStore'
import { TypeComponentShopping } from '@/interfaces/type-component'
import { cn } from '@/lib/utils'

interface ProductCartOrCheckoutProps {
	id: number
	name: string
	// typeOffer?: string
	price: string
	image: string
	subtotalItem: number
	quantity: number
	typeComponent?: TypeComponentShopping
}

export const ProductCartOrCheckout = ({
	id,
	name,
	subtotalItem,
	image,
	quantity,
	typeComponent,
}: ProductCartOrCheckoutProps) => {
	const removeProduct = useCartStore((state) => state.removeProduct)

	return (
		<div
			className={cn(
				'flex items-center',
				typeComponent === 'checkout' && 'mb-3',
				typeComponent === 'cart' && 'hover:bg-gray-100 p-2 rounded-sm',
			)}
		>
			<Image
				src={image}
				alt={name}
				width={64}
				height={64}
				className={cn(
					'size-16 aspect-square bg-gray-200 rounded-md overflow-hidden mr-4 object-cover',
					typeComponent === 'checkout' && 'size-10',
				)}
			/>
			<div
				className={cn(
					'flex-grow space-y-2',
					typeComponent === 'checkout' && 'space-y-0',
				)}
			>
				<div className="w-full flex justify-between">
					<h3 className="font-semibold text-gray-800 capitalize">{name}</h3>
					<p className="font-semibold text-gray-800">S./ {subtotalItem}</p>
				</div>
				<div className="w-full flex justify-between items-center">
					<div className="flex items-center gap-2">
						<p className="text-gray-600 w-fit">Cantidad:</p>
						<div className="w-fit">
							<span>{quantity}</span>
						</div>
					</div>
					{typeComponent === 'cart' && (
						<p
							className="text-red-500 hover:text-red-600 cursor-pointer"
							onClick={(evt) => {
								evt.preventDefault()
								removeProduct(id)
							}}
							role="button"
						>
							Eliminar
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
