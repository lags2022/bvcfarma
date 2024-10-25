import { z } from 'zod'

import { isNumber } from './checkout-schema'

export const UserUpdateProfileSchema = z.object({
	name: z.string(),
	email: z.string().email('Correo electrónico inválido'),
	// password: z
	// 	.string()
	// 	.optional()
	// 	.refine((value) => !value || value.length >= 8, {
	// 		message: 'Debe tener al menos 8 caracteres',
	// 	})
	// 	.refine((value) => !value || value.length <= 32, {
	// 		message: 'La contraseña es demasiado larga',
	// 	}),
	// confirmPassword: z.string().optional(),
	address: z
		.object({
			firstName: z
				.string()
				.trim()
				.optional()
				.refine((value) => !value || value.length >= 3, {
					message: 'Debe tener al menos 3 caracteres',
				})
				.refine((value) => !value || value.length <= 100, {
					message: 'Los nombres completos son demasiado largos',
				}),
			lastName: z
				.string()
				.trim()
				.optional()
				.refine((value) => !value || value.length >= 5, {
					message: 'Debe tener al menos 5 caracteres',
				})
				.refine((value) => !value || value.length <= 100, {
					message: 'Los apellidos son demasiado largos',
				}),
			image: z
				.string()
				.optional()
				.refine(
					(value) => !value || z.string().url().safeParse(value).success,
					{
						message: 'La URL de la imagen es inválida',
					},
				),
			phone: z
				.string()
				.trim()
				.optional()
				.refine((value) => !value || isNumber(value), {
					message: 'Solo se permiten números',
				})
				.refine((value) => !value || value.length > 5, {
					message: 'El teléfono debe tener más de 5 caracteres',
				})
				.refine((value) => !value || value.length < 15, {
					message: 'El teléfono debe tener menos de 15 caracteres',
				}),
			address: z
				.string()
				.trim()
				.optional()
				.refine((value) => !value || value.length >= 5, {
					message: 'Debe tener al menos 5 caracteres',
				})
				.refine((value) => !value || value.length <= 100, {
					message: 'La dirección es demasiado larga',
				}),
		})
		.optional(),
})
// .refine((data) => data.password === data.confirmPassword, {
// 	message: 'Las contraseñas no coinciden',
// 	path: ['confirmPassword'], // Esto indicará el error en el campo confirmPassword

export type UserUpdateProfileSchemaType = z.infer<
	typeof UserUpdateProfileSchema
>
