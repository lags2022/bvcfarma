'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { DataCheckout } from '@/components/culqi/CulqiButton'
import { createOcNumber } from '@/helpers/create-ocnumber'
import { fetchUrl } from '@/helpers/fetchUrl'
import { CulqiCharge } from '@/interfaces/culqi/culqi-cargo'
import { orderController } from '@/lib/factoryController'

import { getUser } from './user-action'

export async function createCharge(token: any, dataCheckout: DataCheckout) {
	try {
		const { id } = token
		const {
			personData: {
				firstName,
				lastName,
				phone,
				typeDocument,
				numberDocument,
				email: emailPerson,
				address,
				postalCode,
				department,
				province,
				district,
				reference,
			},
			deliveryType,
			paymentMethod,
			totalCheckout,
			productsCart,
			totalCart,
			discount,
			subtotal,
			shippingCost,
		} = dataCheckout

		let response = (await fetchUrl({
			url: 'https://api.culqi.com/v2/charges',
			method: 'POST',
			headersOptions: {
				Authorization: `Bearer ${process.env.CULQI_SK_TEST}`,
			},
			typeFetching: 'checkout',
			body: {
				amount: 3000, // En céntimos
				currency_code: 'PEN', // PEN o USD
				email: token.email ?? emailPerson,
				source_id: id,
				// capture: true,
				description: `Pago en ${paymentMethod}`,
				// installments: 1,
				metadata: {
					typeDocument,
					dni: numberDocument,
					email: emailPerson,
				},
				antifraud_details: {
					address,
					address_city: district,
					country_code: 'PE',
					first_name: firstName,
					last_name: lastName,
					phone_number: phone,
				},
			},
		})) as CulqiCharge

		if (response.object === 'error') {
			throw new Error(`${response}`)
		}

		if (response.outcome.type === 'venta_exitosa') {
			const lastOrder = await orderController().getLastOrder()

			const user = await getUser()

			if (!user) {
				throw new Error('No hay usuario autenticado')
			}

			const newOrder = await orderController().create({
				paymentMethod,
				deliveryType,
				quantityItems: productsCart.length,
				total: totalCheckout,
				paidAt: new Date(),
				observation: '',
				transactionId: response.id,
				ocNumber: createOcNumber(lastOrder?.ocNumber),
				totalCart,
				discount,
				subtotal,
				shippingCost,
				user: {
					connect: {
						id: user.id,
					},
				},
				orderAddress: {
					create: {
						firstName,
						lastName,
						phone,
						typeDocument,
						numberDocument,
						countryId: 1,
						email: emailPerson,
						address,
						postalCode,
						department,
						province,
						district,
						reference: reference ? reference : '',
					},
				},
				orderItems: {
					create: productsCart.map(
						({ id, name, image, price, quantity, subtotalItem }) => ({
							name,
							image,
							price,
							quantity,
							idProductErp: id,
							subtotalItem,
						}),
					),
				},
			})

			cookies().set({
				name: 'success-order',
				value: 'true',
				httpOnly: true,
				path: '/checkout/success',
				maxAge: 0, // para que el cookie expire luego de la página
			})

			redirect(`/checkout/success?id=${newOrder.id}`)
		}
	} catch (error) {
		throw error
	}
}
