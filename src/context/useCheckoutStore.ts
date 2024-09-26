import { PaymentMethod, DeliveryType, TypeDocument } from '@prisma/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PersonData {
	firstName: string
	lastName: string
	phone: string
	typeDocument: TypeDocument
	numberDocument: string
	email: string
	countryId: number
	address: string
	postalCode: string
	department: string
	province: string
	district: string
	reference?: string
}

interface ShoppingCheckoutState {
	personData: PersonData
	deliveryType: DeliveryType
	paymentMethod: PaymentMethod
	setPersonData: (updater: (prevState: PersonData) => PersonData) => void
	setPersonDataEmail: (email: string) => void
	setDeliveryType: (deliveryType: DeliveryType) => void
	setPaymentMethod: (paymentMethod: PaymentMethod) => void
}

export const useCheckoutStore = create<ShoppingCheckoutState>()(
	persist(
		(set, get) => ({
			personData: {
				firstName: '',
				lastName: '',
				phone: '',
				typeDocument: TypeDocument.DNI,
				numberDocument: '',
				email: '',
				countryId: 1,
				address: '',
				postalCode: '',
				department: '',
				province: '',
				district: '',
				reference: '',
			},
			deliveryType: DeliveryType.STANDARD,
			paymentMethod: PaymentMethod.CARD,
			setPersonData: (updater) => {
				set((state) => ({
					personData: updater(state.personData),
				}))
			},
			setPersonDataEmail: (email) => {
				set((state) => ({
					personData: {
						...state.personData,
						email,
					},
				}))
			},
			setDeliveryType: (deliveryType) => {
				set({ deliveryType })
			},
			setPaymentMethod: (paymentMethod) => {
				set({ paymentMethod })
			},
		}),
		{
			name: 'shopping-checkout',
		},
	),
)
