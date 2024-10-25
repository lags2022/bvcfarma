import * as z from 'zod'

export const isNumber = (value: string) => /^\d+$/.test(value)

export const checkoutPersonDataSchema = z.object({
	firstName: z.string().min(1, 'El nombre es requerido'),
	lastName: z.string().min(1, 'Los apellidos son requeridos'),
	phone: z
		.string()
		// Eliminamos caracteres no numéricos y verificamos si lo que queda es un número válido
		.trim()
		.refine(isNumber, {
			message: 'Solo se permiten números',
		})
		// Validamos que tenga al menos 9 dígitos
		.refine((phone) => phone.length > 5, {
			message: 'El teléfono debe tener mas de 5 caracteres',
		})
		.refine((phone) => phone.length < 15, {
			message: 'El teléfono debe tener menos de 15 caracteres',
		}),
	email: z.string().email('Correo electrónico inválido'),
	typeDocument: z.enum(['DNI', 'PASSPORT', 'FOREIGNER_CARD'], {
		errorMap: () => ({ message: 'Seleccione un tipo de documento' }),
	}),
	countryId: z.number().min(1, 'Seleccione un país'),
	numberDocument: z
		.string()
		.trim()
		.min(1, 'El número de documento es requerido')
		.refine(isNumber, {
			message: 'Solo se permiten números',
		})
		// Validamos que tenga al menos 9 dígitos
		.refine((phone) => phone.length <= 30, {
			message: 'Debe tener menos de 30 dígitos',
		}),
	department: z.string().min(1, 'Seleccione un departamento'),
	province: z.string().min(1, 'Seleccione una provincia'),
	district: z.string().min(1, 'Seleccione un distrito'),
	address: z
		.string()
		.trim()
		.refine((value) => value.length >= 5, {
			message: 'Debe tener al menos 6 caracteres',
		})
		// Validamos que tenga al menos 9 dígitos
		.refine((value) => value.length <= 100, {
			message: 'La direccion es demasiado larga',
		}),
	reference: z.string().optional(),
	postalCode: z
		.string()
		.trim()
		.refine(isNumber, {
			message: 'Solo se permiten números',
		})
		.refine((phone) => phone.length >= 1, {
			message: 'Debe tener al menos 1 dígito',
		})
		// Validamos que tenga al menos 9 dígitos
		.refine((phone) => phone.length <= 5, {
			message: 'Debe tener menos de 5 dígitos',
		}),
})

export const checkoutDeliveryTypeSchema = z.object({
	deliveryType: z.enum(['EXPRESS', 'STANDARD', 'PICKUP'], {
		errorMap: () => ({ message: 'Seleccione un tipo de entrega' }),
	}),
})

export const checkoutPaymentTypeSchema = z.object({
	paymentMethod: z.enum(['CARD', 'YAPE', 'CASH', 'TRANSFER', 'POS'], {
		errorMap: () => ({ message: 'Seleccione un método de pago' }),
	}),
})

export const dataCheckoutSchema = z.object({
	personData: checkoutPersonDataSchema,
	deliveryType: checkoutDeliveryTypeSchema.shape.deliveryType,
	paymentMethod: checkoutPaymentTypeSchema.shape.paymentMethod,
	totalCheckout: z.number().min(1, 'El monto total es requerido'),
	productsCart: z.array(
		z.object({
			id: z.number().min(1, 'El ID del producto es requerido'),
			name: z.string().min(1, 'El nombre del producto es requerido'),
			image: z.string().min(1, 'La imagen del producto es requerido').url(),
			price: z.string().min(1, 'El precio del producto es requerido'),
			quantity: z.number().min(1, 'La cantidad es requerida'),
			subtotalItem: z.number().min(1, 'El subtotal del producto es requerido'),
		}),
	),
	totalCart: z.number().min(1, 'El monto total del carrito es requerido'),
	discount: z.number().min(0, 'El descuento es requerido'),
	subtotal: z.number().min(1, 'El subtotal es requerido'),
	shippingCost: z.number().min(1, 'El costo de envío es requerido'),
})
