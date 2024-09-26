'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentMethod } from '@prisma/client'
import { CreditCard } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCheckoutStore } from '@/context/useCheckoutStore'
import { formatPaymentMethod } from '@/helpers/enum-mod'
import { checkoutPaymentTypeSchema } from '@/schemas/checkout-schema'

export const CheckoutPaymentType = () => {
	const { setPaymentMethod, paymentMethod } = useCheckoutStore(
		useShallow((state) => ({
			paymentMethod: state.paymentMethod,
			setPaymentMethod: state.setPaymentMethod,
		})),
	)

	const {
		control,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(checkoutPaymentTypeSchema),
		defaultValues: { paymentMethod },
	})

	const handleChange = (value: PaymentMethod) => {
		setPaymentMethod(value)
		setValue('paymentMethod', value)
		trigger('paymentMethod')
	}

	return (
		<Card>
			<AccordionItem value="payment" className="border-none">
				<AccordionTrigger className="text-base font-semibold px-6 py-4">
					<span className="flex items-center">
						<CreditCard className="mr-2" />
						¿Cómo quieres pagar?
					</span>
				</AccordionTrigger>
				<AccordionContent className="px-6 pb-4">
					<Controller
						name="paymentMethod"
						control={control}
						render={({ field }) => (
							<RadioGroup
								value={field.value}
								onValueChange={handleChange}
								className="space-y-4"
							>
								{formatPaymentMethod.map((item) => (
									<div key={item.value}>
										<div className="flex items-center space-x-2">
											<RadioGroupItem value={item.value} id={item.value} />
											<Label htmlFor={item.value}>
												Pago {item.label !== 'efectivo' ? 'con' : 'en'}{' '}
												<span className="capitalize">{item.label}</span>
											</Label>
										</div>
										{field.value === item.value && (
											<div className="pl-6 mt-2">
												<p className="text-sm text-muted-foreground">
													Instrucciones: Haz click en Finalizar compra para
													completar el pago
												</p>
											</div>
										)}
									</div>
								))}
							</RadioGroup>
						)}
					/>
					{errors.paymentMethod && (
						<p className="text-red-500 text-sm mt-1">
							{errors.paymentMethod.message}
						</p>
					)}
				</AccordionContent>
			</AccordionItem>
		</Card>
	)
}
