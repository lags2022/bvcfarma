import { Prisma, User } from '@prisma/client'

import { executeAction } from '@/helpers/execute-action'
import { ResponseStatus } from '@/interfaces/general'
import { UserModelConstructor, UserModelImplements } from '@/interfaces/models'
import prisma from '@/lib/prisma'
import { staticImplements } from '@/lib/static'

@staticImplements<UserModelConstructor>()
export class UserModelPrisma implements UserModelImplements {
	static async getByEmail(email: string): Promise<User> {
		return this.getUser({ email })
	}

	static async getById(id: string): Promise<User> {
		return this.getUser({ id })
	}

	static async create(data: Prisma.UserCreateInput): Promise<User> {
		return executeAction(async () => {
			const userCreated = await prisma.user.create({
				data,
			})

			return userCreated
		})
	}

	static async addFavorite(
		userId: string,
		productId: number,
	): Promise<ResponseStatus> {
		return executeAction(async () => {
			await prisma.user.update({
				where: { id: userId },
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
				where: { id: userId },
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

	private static async getUser(
		where: Prisma.UserWhereUniqueInput,
	): Promise<User> {
		return executeAction(async () => {
			const user = await prisma.user.findUnique({
				where,
			})

			if (!user) {
				throw new Error('Usuario no encontrado')
			}

			return user
		})
	}
}
