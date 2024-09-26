'use client'

import { DeliveryType, PaymentMethod } from '@prisma/client'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'

import { createCharge } from '@/actions/culqi-action'
import { LOGO } from '@/constants/general'
import { CartShoppingProduct, useCartStore } from '@/context/useCartStore'
import { PersonData, useCheckoutStore } from '@/context/useCheckoutStore'
import { useCheckoutCulqi } from '@/context/useCulqi'
import { TokenV4 } from '@/interfaces/culqi/culqi'
import { dataCheckoutSchema } from '@/schemas/checkout-schema'

import { ButtonGeneral } from '../button/ButtonGeneral'

export interface DataCheckout {
	personData: PersonData // Datos del usuario
	deliveryType: DeliveryType
	paymentMethod: PaymentMethod
	totalCheckout: number
	productsCart: CartShoppingProduct[]
	totalCart: number
	discount: number
	subtotal: number
	shippingCost: number
}

export const CulqiButton = () => {
	const { personData, deliveryType, paymentMethod } = useCheckoutStore(
		useShallow((state) => ({
			personData: state.personData,
			deliveryType: state.deliveryType,
			paymentMethod: state.paymentMethod,
		})),
	)

	const {
		totalCheckout,
		productsCart,
		totalCart,
		discount,
		subtotal,
		shippingCost,
	} = useCartStore(
		useShallow((state) => ({
			totalCheckout: state.totalCheckout,
			productsCart: state.productsCart,
			totalCart: state.totalCart,
			discount: state.discount,
			subtotal: state.subtotal,
			shippingCost: state.shippingCost,
		})),
	)

	const dataCheckout: DataCheckout = {
		personData,
		deliveryType,
		paymentMethod,
		totalCheckout,
		productsCart,
		totalCart,
		discount,
		subtotal,
		shippingCost,
	}

	const handleValidation = () => {
		const validation = dataCheckoutSchema.safeParse(dataCheckout)

		if (!validation.success) {
			toast.error(`Complete los datos de la compra`)
			console.log(validation.error.message)
			return
		}

		return validation
	}

	const handleToken = (token: TokenV4) => {
		const validation = handleValidation()

		if (!validation) {
			return
		}

		const payment = createCharge(token, validation.data)
		toast.promise(payment, {
			loading: 'Realizando el pago...',
			success: 'Pago exitoso',
			error: 'Error al realizar el pago',
		})
	}

	const { openCulqi, token, error } = useCheckoutCulqi({
		settings: {
			title: '¡Realiza tu compra ahora!',
			currency: 'PEN',
			amount: '3000',
			options: {
				lang: 'auto',
				installments: false,
				paymentMethods: {
					tarjeta: true,
					yape: true,
					bancaMovil: true,
					agente: true,
					billetera: true,
					cuotealo: true,
				},
				style: {
					logo: LOGO,
					bannerColor: '',
					buttonBackground: '',
					buttonText: '',
					buttonTextColor: '',
					linksColor: '',
					menuColor: '',
					priceColor: '',
				},
				// metadata: {
				// 	negocio: 'culqi store', // Metadata relacionada al comercio
				// },
			},
		},
		onClose: () => {
			console.log('Handle the closing of the modal')
		},
		onToken: handleToken,
		onError: (error: any) => {
			console.log('handle the errors', error)
			toast.error(`Error al realizar el pago: ${error}`)
		},
	})

	const handleClick = () => {
		const validation = handleValidation()

		if (!validation) {
			return
		}
		openCulqi()
	}

	return (
		<ButtonGeneral onClick={handleClick} className="w-fit px-16">
			Finalizar compra
		</ButtonGeneral>
	)
}
