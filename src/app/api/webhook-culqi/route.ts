import { NextResponse } from 'next/server'

import { EmailTemplateCheckoutSuccess } from '@/components/email/EmailTemplateCheckoutSuccess'
import { ChargeData } from '@/interfaces/culqi/culqi-webhook'
import { culqiChargeController, orderController } from '@/lib/factoryController'
import { resend } from '@/lib/resend'
import { clientTwilio } from '@/lib/twilio'

export async function POST(request: Request) {
	try {
		const body = await request.json()

		if (body.type !== 'charge.creation.succeeded')
			throw new Error(
				`Error en el pago, el webhook no es del tipo charge.creation.succeeded: ${body.data}`,
			)

		const chargeData = JSON.parse(body.data) as ChargeData

		const order = await orderController().getByField(
			'transactionId',
			chargeData.id,
			true,
			true,
			true,
		)

		if (!order) {
			throw new Error('No se encontró la orden')
		}

		if (order?.culqiCharge) {
			console.log('El order ya tiene un culqi charge')
			return NextResponse.json(
				{ message: 'El order ya tiene un culqi charge' },
				{ status: 200 },
			)
		}

		const newOrderCulqiCharge = await culqiChargeController().create({
			creationDate: chargeData.creationDate,
			amount: chargeData.amount,
			amountRefunded: chargeData.amountRefunded,
			currentAmount: chargeData.currentAmount,
			currencyCode: chargeData.currencyCode,
			description: chargeData.description,
			installments: chargeData.installments,
			statementDescriptor: chargeData.statementDescriptor,
			paid: chargeData.paid,
			dispute: chargeData.dispute,
			sourceIdToken: chargeData.source.id,
			sourceType: chargeData.source.type,
			fraudScore: chargeData.fraudScore,
			userMessage: chargeData.outcome.userMessage,
			merchantMessage: chargeData.outcome.merchantMessage,
			order: {
				connect: {
					id: order.id,
				},
			},
		})

		if (!newOrderCulqiCharge) {
			throw new Error(
				`No se pudo crear el nuevo culqi charge a la orden ${order.id}`,
			)
		}

		// Send the message con resend
		const data = await resend.emails.send({
			from: 'melcabo954@lgdevs.com',
			to: [order?.orderAddress?.email as string, 'melcabo954@gmail.com'],
			subject: 'Prueba de email',
			react: EmailTemplateCheckoutSuccess({
				order,
			}),
		})

		console.log(data)

		// Send the message con twilio por whatsapp
		const response = await clientTwilio.messages.create({
			body: `Hola, este es un mensaje de prueba y el correo es ${order?.orderAddress?.email} el link es https://bvcfarma.vercel.app`,
			from: 'whatsapp:+14155238886', // Your Twilio Sandbox Number
			to: `whatsapp:+51932052849`, // Recipient's phone number
		})

		console.log(response)

		return NextResponse.json({ message: 'ok' }, { status: 200 })
	} catch (error) {
		console.error(error, 'Error en el webhook')
		return NextResponse.json({ message: `${error}` }, { status: 500 })
	}
}

export function OPTIONS() {
	return NextResponse.json(
		{},
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			},
		},
	)
}
