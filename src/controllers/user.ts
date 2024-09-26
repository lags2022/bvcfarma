// import { Prisma, User } from '@prisma/client'

// import { ResponseStatus } from '@/interfaces/general'
// import { UserModelConstructor } from '@/interfaces/models'

// import { GenericCrud } from './generic'

// interface UserControllerImplements extends Omit<UserModelConstructor, 'new'> {}

// // aqui solo tendrias que cambiar Prisma.UserCreateInput, User por otro modelo de base de datos osea solo cambiarias los tipos
// export class UserController
// 	extends GenericCrud<UserControllerImplements, Prisma.UserCreateInput, User>
// 	implements UserControllerImplements
// {
// 	constructor(model: UserControllerImplements) {
// 		super(model)
// 	}

// 	async getByEmail(email: string): Promise<User> {
// 		return this.executeAction(() => this.model.getByEmail(email))
// 	}

// 	async addFavorite(
// 		userId: string,
// 		productId: number,
// 	): Promise<ResponseStatus> {
// 		return this.executeAction(() => this.model.addFavorite(userId, productId))
// 	}

// 	async removeFavorite(
// 		userId: string,
// 		newFavorites: number[],
// 	): Promise<ResponseStatus> {
// 		return this.executeAction(() =>
// 			this.model.removeFavorite(userId, newFavorites),
// 		)
// 	}
// }
