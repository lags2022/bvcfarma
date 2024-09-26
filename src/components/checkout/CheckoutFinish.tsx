import { format } from '@formkit/tempo'
import { Clock, FileText, Home, Truck, Wallet } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DELIVERY_TYPE_MOD, PAYMENT_METHOD_MOD } from '@/constants/enum-mod'
import { useCheckoutStore } from '@/context/useCheckoutStore'

import { CulqiButton } from '../culqi/CulqiButton'

export const CheckoutFinish = () => {
	const {
		address,
		department,
		province,
		district,
		paymentMethod,
		deliveryType,
		reference,
	} = useCheckoutStore(
		useShallow((state) => ({
			address: state.personData.address,
			department: state.personData.department,
			province: state.personData.province,
			district: state.personData.district,
			paymentMethod: state.paymentMethod,
			deliveryType: state.deliveryType,
			reference: state.personData.reference,
		})),
	)

	return (
		<Card className="w-full md:col-span-2">
			<CardHeader>
				<CardTitle className="text-base">
					Comprueba tus datos antes de finalizar tu compra
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center space-x-2">
					<Truck className="text-muted-foreground" />
					<p>Tipo de entrega: {DELIVERY_TYPE_MOD[deliveryType]}</p>
				</div>

				<div className="flex items-center space-x-2">
					<Home className="text-muted-foreground" />
					<p>
						Dirección: {address} - {department} - {province} - {district} -{' '}
						{reference}
					</p>
				</div>

				<div className="flex items-center space-x-2">
					<Clock className="text-muted-foreground" />
					<p>
						Fecha y hora de entrega: Hoy,{' '}
						{format(new Date(), 'dddd D MMMM', 'es-PE')} entre las 11:51 am y
						01:21 pm
					</p>
				</div>
				<div className="flex items-center space-x-2">
					<FileText className="text-muted-foreground" />
					<p>Comprobante de pago: Boleta</p>
				</div>
				<div className="flex items-center space-x-2">
					<Wallet className="text-muted-foreground" />
					<p>Medio de pago: <span className='capitalize'>{PAYMENT_METHOD_MOD[paymentMethod]}</span></p>
				</div>
				<div className="w-full flex justify-center items-center">
					<CulqiButton />
				</div>
			</CardContent>
		</Card>
	)
}
