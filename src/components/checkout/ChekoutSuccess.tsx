'use client'

import { format } from '@formkit/tempo'
import { DeliveryType, PaymentMethod } from '@prisma/client'
import { CheckCircle } from 'lucide-react'
import { useEffect } from 'react'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DELIVERY_TYPE_MOD, PAYMENT_METHOD_MOD } from '@/constants/enum-mod'
import { smoothScrollToTop } from '@/helpers/smooth-scroll-top'

import { ButtonGeneral } from '../button/ButtonGeneral'

interface ChekoutSuccessProps {
	ocNumber: string
	date: Date | string
	address: string
	department: string
	province: string
	district: string
	reference?: string
	phone: string
	paymentMethod: PaymentMethod
	deliveryType: DeliveryType
	subtotal: string
	total: string
	shippingCost: string
}

export const ChekoutSuccess = ({
	ocNumber,
	date,
	address,
	department,
	province,
	district,
	reference,
	phone,
	paymentMethod,
	deliveryType,
	subtotal,
	total,
	shippingCost,
}: ChekoutSuccessProps) => {
	useEffect(() => {
		const cancelScrollAnimation = smoothScrollToTop()

		return () => {
			cancelScrollAnimation()
		}
	}, [])

	const formattedDate =
		typeof date === 'string'
			? date
			: format(date, 'DD/MM/YYYY HH:mm:ss', 'es-PE')

	const deliveryTypeMod = DELIVERY_TYPE_MOD[deliveryType].slice(
		0,
		deliveryType !== 'PICKUP' ? -8 : undefined,
	)

	const paymentMethodMod = PAYMENT_METHOD_MOD[paymentMethod]

	return (
		<div className="flex items-center justify-center p-4 md:p-6 bg-gray-100 text-sm">
			<Card className="w-full max-w-2xl">
				<CardHeader className="text-center">
					<CheckCircle className="w-16 h-16 mx-auto text-picker-3 mb-4" />
					<CardTitle className="text-xl font-bold text-gray-800">
						¡Gracias por tu compra!
					</CardTitle>
					<p className="text-gray-600">Tu solicitud de compra fue recibida</p>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-gray-600 mb-4 text-center">
						Tu pedido se encuentra en proceso de validación, en breve recibirás
						un correo con el detalle de tu compra.
					</p>
					<div className="bg-gray-50 p-4 rounded-lg mb-6">
						<p className="text-center font-semibold mb-2">Pedido: {ocNumber}</p>
						<p className="text-center text-sm text-gray-600">
							Fecha de Solicitud de compra: {formattedDate}
						</p>
					</div>
					<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
						<div className="capitalize">
							<h3 className="font-semibold mb-2">Dirección</h3>
							<p>{address}</p>
							<p>{reference}</p>
							<p>
								{department} - {province} - {district}
							</p>
							<p>{phone}</p>
						</div>
						<div className='xs:col-span-1'>
							<h3 className="font-semibold mb-2">Medio de Pago</h3>
							<p>
								Pago {paymentMethodMod !== 'efectivo' ? 'con' : 'en'}{' '}
								<span className="capitalize">{paymentMethodMod}</span>
							</p>
							<p>{deliveryTypeMod}</p>
						</div>
						<div className='xs:col-span-full sm:col-span-1'>
							<h3 className="font-semibold mb-2">Resumen</h3>
							<div className="flex justify-between text-sm">
								<span>Subtotal</span>
								<span>S/ {subtotal}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Costo del envío</span>
								<span>S/ {shippingCost}</span>
							</div>
							<div className="flex justify-between font-semibold mt-2">
								<span>Total</span>
								<span>S/ {total}</span>
							</div>
						</div>
					</div>
					<div className="flex justify-center space-x-4">
						<ButtonGeneral variant="ghost" href="/">
							Seguir Comprando
						</ButtonGeneral>
						<ButtonGeneral href="/orders">Ver Órdenes</ButtonGeneral>
					</div>
				</CardContent>
			</Card>
			<Fireworks autorun={{ speed: 0.75, duration: 2000 }} />
		</div>
	)
}
