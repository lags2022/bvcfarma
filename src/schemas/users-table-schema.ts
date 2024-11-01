import { z } from 'zod'
import { UserWithSelectedAddressFields } from '@/interfaces/models'
import { ROLE_MOD } from '../constants/enum-mod'

export const transformedUsers = (users: UserWithSelectedAddressFields[]) =>
	users.map((user) => ({
		id: user.id,
		name: user.name,
		image: user.address?.image || '',
		email: user.email,
		phone: user.address?.phone || '',
		role: ROLE_MOD[user.role],
		address: user.address?.address || '',
	}))

export const usersSchema = z.object({
	id: z.string(),
	name: z.string(),
	image: z.string(),
	email: z.string(),
	phone: z.string(),
	role: z.string(),
	address: z.string(),
})

export type UsersSchemaType = z.infer<typeof usersSchema>

export const usersParsed = (users: UserWithSelectedAddressFields[]) =>
	z.array(usersSchema).parse(transformedUsers(users))
