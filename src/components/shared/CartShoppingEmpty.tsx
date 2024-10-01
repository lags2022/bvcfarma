import { ShoppingCart } from 'lucide-react'

import { useCartStore } from '@/context/useCartStore'
import { TypeComponentShopping } from '@/interfaces/type-component'

import { ButtonGeneral } from '../button/ButtonGeneral'

export const CartShoppingEmpty = ({
	typeComponent,
}: {
	typeComponent: TypeComponentShopping
}) => {
	const setShowCart = useCartStore((state) => state.setShowCart)

	return (
		<>
			{typeComponent === 'cart' && (
				<h2 className="font-semibold text-gray-800 pr-4">Bvcfarma</h2>
			)}
			<div className="p-8 pr-12 rounded-lg w-full h-full flex flex-col justify-center items-center text-center gap-2">
				<div className="relative inline-block">
					<ShoppingCart className="w-16 h-16 text-picker-3" />
					<span className="absolute top-0 -right-1.5 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-picker-3 rounded-full">
						!
					</span>
				</div>
				<h2 className="font-bold text-gray-800">Tu carrito está vacío</h2>
				<p className="text-gray-600 text-sm">
					Agrega algunos productos a tu carrito para poder comprar
				</p>
				<ButtonGeneral
					href={'/#lo-mas-buscado'}
					onClick={() => {
						if (typeComponent === 'cart') setShowCart()
					}}
				>
					Ir a la página de inicio
				</ButtonGeneral>
			</div>
		</>
	)
}
