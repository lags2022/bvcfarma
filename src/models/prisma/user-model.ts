import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { executeAction } from '@/helpers/execute-action'
import { ResponseStatus, ResponseStatusUserUpdated } from '@/interfaces/general'
import {
	UserModelConstructor,
	UserModelImplements,
	UserWithSelectedAddressFields,
} from '@/interfaces/models'
import prisma from '@/lib/prisma'
import { staticImplements } from '@/lib/static'
import { UserUpdateProfileSchemaType } from '@/schemas/profile-schema'

export const selectUser = {
	id: true,
	name: true,
	email: true,
	favorites: true,
	role: true,
	address: true,
} as const
// as Record<keyof User, true>

@staticImplements<UserModelConstructor>()
export class UserModelPrisma implements UserModelImplements {
	static async getByEmail(
		email: string,
		password: string,
	): Promise<UserWithSelectedAddressFields> {
		return executeAction(async () => {
			const user = await prisma.user.findUnique({
				where: { email, isActive: true },
				select: { ...selectUser, password: true },
			})

			if (!user) throw new Error('Usuario no encontrado')

			const validatePassword = await bcrypt.compare(
				password,
				user.password as string,
			)

			if (!validatePassword) throw new Error('Invalid password')

			const { password: _, ...userWithoutPassword } = user

			return userWithoutPassword
		})
	}

	static async getById(
		id: string,
	): Promise<Omit<UserWithSelectedAddressFields, 'address'>> {
		return executeAction(async () => {
			const user = await prisma.user.findUnique({
				where: { id, isActive: true },
				select: {
					...selectUser,
					address: false,
				},
			})

			if (!user) {
				throw new Error('Usuario no encontrado')
			}

			return user
		})
	}

	static async create(
		data: Prisma.UserCreateInput,
	): Promise<UserWithSelectedAddressFields> {
		return executeAction(async () => {
			// revisar si el usuario esta desactivado
			const userExists = await prisma.user.findFirst({
				where: {
					email: data.email,
					isActive: false,
				},
			})

			if (userExists) {
				const userUpdated = await prisma.user.update({
					where: {
						id: userExists.id,
					},
					data: {
            name: data.name,
            password: data.password,
            isActive: true,
					},
					select: selectUser,
				})

				return userUpdated
			}

			const userCreated = await prisma.user.create({
				data,
				select: selectUser,
			})

			return userCreated
		})
	}

	static async update(
		id: string,
		data: UserUpdateProfileSchemaType,
	): Promise<ResponseStatusUserUpdated> {
		return executeAction(async () => {
			const {
				email = '',
				address: {
					firstName = '',
					lastName = '',
					phone = '',
					image = '',
					address = '',
				} = {},
			} = data

			const addressUpsert = {
				firstName,
				lastName,
				image,
				address,
				phone,
			}

			const userUpdated = await prisma.user.update({
				where: {
					id,
					isActive: true,
				},
				data: {
					name: firstName,
					email,
					address: {
						upsert: {
							update: addressUpsert,
							create: addressUpsert,
						},
					},
				},
				select: selectUser,
			})

			return {
				message: 'Update user',
				data: userUpdated,
				status: 'success',
			}
		})
	}

	static async addFavorite(
		userId: string,
		productId: number,
	): Promise<ResponseStatus> {
		return executeAction(async () => {
			await prisma.user.update({
				where: { id: userId, isActive: true },
				data: {
					favorites: {
						push: productId,
					},
				},
			})

			return {
				message: 'Favorito agregado',
				status: 'success',
			}
		})
	}

	static async removeFavorite(
		userId: string,
		newFavorites: number[],
	): Promise<ResponseStatus> {
		return executeAction(async () => {
			await prisma.user.update({
				where: { id: userId, isActive: true },
				data: {
					favorites: newFavorites,
				},
			})

			return {
				message: 'Favorito eliminado',
				status: 'success',
			}
		})
	}

	static async getByIdWithAddress(
		userId: string,
	): Promise<UserWithSelectedAddressFields> {
		return executeAction(async () => {
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
					isActive: true,
				},
				select: selectUser,
			})

			if (!user) {
				throw new Error('Usuario no encontrado')
			}

			return user
		})
	}

	static async delete(id: string): Promise<ResponseStatus> {
		return executeAction(async () => {
			// Verifica si el registro existe
			const addressExists = await prisma.userAddress.findUnique({
				where: { userId: id },
			})

			let userAddressDeletedPromised: Promise<any> = Promise.resolve()

			// no eliminar, solo desactivar usuario y poner name en "", password en ""
			const userPromised = prisma.user.update({
				where: {
					id,
					isActive: true,
				},
				data: {
					name: null,
					password: null,
					isActive: false,
					favorites: {
						set: [],
					},
				},
			})

			// eliminar direccion
			if (addressExists) {
				userAddressDeletedPromised = prisma.userAddress.delete({
					where: {
						userId: id,
					},
				})
			}

			// no eliminar, solo desactivar ordenes
			const ordersPromised = prisma.order.updateMany({
				where: {
					userId: id,
				},
				data: {
					isActive: false,
				},
			})

			await Promise.all([
				userPromised,
				userAddressDeletedPromised,
				ordersPromised,
			])

			return {
				message: 'Usuario desactivado',
				status: 'success',
			}
		})
	}

  static async updatePassword(
    id: string,
    password: string,
  ): Promise<ResponseStatus> {
    return executeAction(async () => {
      const hashedPassword = await bcrypt.hash(password, 10)

      await prisma.user.update({
        where: {
          id,
          isActive: true,
        },
        data: {
          password: hashedPassword,
        },
      })

      return {
        message: 'Contraseña actualizada',
        status: 'success',
      }
    })
  }

  static async getAll(): Promise<UserWithSelectedAddressFields[]> {
    return executeAction(async () => {
      return await prisma.user.findMany({
        where: {
          isActive: true,
        },
        select: selectUser,
      })
    })
  }
}
