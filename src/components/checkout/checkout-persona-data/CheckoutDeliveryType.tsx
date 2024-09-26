import { zodResolver } from '@hookform/resolvers/zod'
import { DeliveryType } from '@prisma/client'
import { Truck } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useCheckoutStore } from '@/context/useCheckoutStore'
import { formatDeliveryType } from '@/helpers/enum-mod'
import { checkoutDeliveryTypeSchema } from '@/schemas/checkout-schema'

export const CheckoutDeliveryType = () => {
	const { setDeliveryType, deliveryType } = useCheckoutStore(
		useShallow((state) => ({
			deliveryType: state.deliveryType,
			setDeliveryType: state.setDeliveryType,
		})),
	)

	const {
		control,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(checkoutDeliveryTypeSchema),
		defaultValues: { deliveryType },
	})

	const handleChange = (value: DeliveryType) => {
		setDeliveryType(value)
		setValue('deliveryType', value)
		trigger('deliveryType')
	}

	console.log(deliveryType)

	return (
		<Card>
			<AccordionItem value="deliveryType" className="border-none">
				<AccordionTrigger className="text-base font-semibold px-6 py-4">
					<span className="flex items-center">
						<Truck className="mr-2" />
						Elige un tipo de entrega
					</span>
				</AccordionTrigger>
				<AccordionContent className="px-6 pb-4">
					<div className="space-y-4">
						<Controller
							name="deliveryType"
							control={control}
							render={({ field }) => (
								<Select onValueChange={handleChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Seleccione tipo de entrega" />
									</SelectTrigger>
									<SelectContent>
										{formatDeliveryType.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.deliveryType && (
							<p className="text-red-500 text-sm mt-1">
								{errors.deliveryType.message}
							</p>
						)}
						<div className="bg-secondary p-4 rounded-lg">
							<p className="text-sm font-medium">Información de entrega</p>
							<p className="text-sm text-muted-foreground">
								La información de entrega se actualizará según la opción
								seleccionada.
							</p>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Card>
	)
}
