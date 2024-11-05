'use client'

import { Minus, Plus, Trash2 } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { useCartStore } from '@/context/useCartStore'
import { CardProductProps } from '@/interfaces/products'

import { ButtonGeneral } from '../button/ButtonGeneral'

export const QuantityControl = ({
	id,
	image,
	name,
	typeOffer,
	price,
	isStock,
}: CardProductProps) => {
	const {
		productsCart,
		addProduct,
		incrementQuantity,
		decrementQuantity,
		removeProduct,
	} = useCartStore(
		useShallow((state) => ({
			productsCart: state.productsCart,
			addProduct: state.addProduct,
			incrementQuantity: state.incrementQuantity,
			decrementQuantity: state.decrementQuantity,
			removeProduct: state.removeProduct,
		})),
	)

	const existingProductIndex = productsCart.findIndex((item) => item.id === id)

	const quantity = productsCart[existingProductIndex]?.quantity ?? 1

	const handleAddToCart = () => {
		addProduct({
			id,
			name,
			image,
			price,
			typeOffer,
			quantity,
			subtotalItem: parseFloat(price) * quantity,
		})
	}
	const handleIncrease = () => {
		incrementQuantity(id)
	}
	const handleDecrease = () => {
		decrementQuantity(id)
		// setQuantity((prev) => Math.max(prev - 1, 1))
	}
	const handleRemove = () => {
		removeProduct(id)
	}

	return (
		<div className="flex-1 max-w-64">
			{existingProductIndex === -1 || !isStock ? (
				<ButtonGeneral
					disabled={!isStock}
					onClick={isStock ? handleAddToCart : () => {}}
				>
					{isStock ? 'Agregar al carrito' : 'Agotado'}
				</ButtonGeneral>
			) : (
				<div className="flex items-center justify-between w-full bg-gray-200 dark:bg-slate-900 rounded-md h-10">
					{quantity === 1 ? (
						<ButtonGeneral size="icon" onClick={handleRemove}>
							<Trash2 className="size-4" />
						</ButtonGeneral>
					) : (
						<ButtonGeneral size="icon" onClick={handleDecrease}>
							<Minus className="size-4" />
						</ButtonGeneral>
					)}
					<span className="font-semibold">{quantity}</span>
					<ButtonGeneral size="icon" onClick={handleIncrease}>
						<Plus className="size-4" />
					</ButtonGeneral>
				</div>
			)}
		</div>
	)
}
