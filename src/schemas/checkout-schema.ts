import * as z from 'zod'

export const checkoutPersonDataSchema = z.object({
	firstName: z.string().min(1, 'El nombre es requerido'),
	lastName: z.string().min(1, 'Los apellidos son requeridos'),
	phone: z
		.string()
		// Eliminamos caracteres no numéricos y verificamos si lo que queda es un número válido
		.refine((phone) => /^\d+$/.test(phone.replace(/\D/g, '')), {
			message: 'El teléfono debe contener solo números',
		})
		// Validamos que tenga al menos 9 dígitos
		.refine((phone) => phone.replace(/\D/g, '').length >= 9, {
			message: 'El teléfono debe tener al menos 9 dígitos',
		}),
	email: z.string().email('Correo electrónico inválido'),
	typeDocument: z.enum(['DNI', 'PASSPORT', 'FOREIGNER_CARD'], {
		errorMap: () => ({ message: 'Seleccione un tipo de documento' }),
	}),
	countryId: z.number().min(1, 'Seleccione un país'),
	numberDocument: z.string().min(1, 'El número de documento es requerido'),
	department: z.string().min(1, 'Seleccione un departamento'),
	province: z.string().min(1, 'Seleccione una provincia'),
	district: z.string().min(1, 'Seleccione un distrito'),
	address: z.string().min(1, 'La dirección es requerida'),
	reference: z.string().optional(),
	postalCode: z.string().min(1, 'El código postal es requerido'),
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
