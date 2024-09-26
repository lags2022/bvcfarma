import { Accordion } from '@/components/ui/accordion'

import { CheckoutAddress } from './CheckoutAddress'
import { CheckoutDeliveryType } from './CheckoutDeliveryType'
import { CheckoutPaymentType } from './CheckoutPaymentType'

export const CheckoutPersonData = () => {
	return (
		<Accordion
			type="multiple"
			defaultValue={['personalInfo', 'deliveryType', 'payment']}
			className="w-full space-y-4 md:col-span-2"
		>
			{/* personal info and direction */}
			<CheckoutAddress />

			{/* delivery type */}
			<CheckoutDeliveryType />

			{/* payment type */}
			<CheckoutPaymentType />
		</Accordion>
	)
}
