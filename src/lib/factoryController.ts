import { CulqiChargeModelPrisma } from '@/models/prisma/culqi-charge'
import { OrderModelPrisma } from '@/models/prisma/order'
import { OrderItemsModelPrisma } from '@/models/prisma/orderItem'
import { UserModelPrisma } from '@/models/prisma/user'

export const userController = () => UserModelPrisma
export const orderController = () => OrderModelPrisma
export const culqiChargeController = () => CulqiChargeModelPrisma
export const orderItemsController = () => OrderItemsModelPrisma

// import { UserController } from '@/controllers'

// Puedes definir otros modelos y controladores aquí
// const controllers = {
// 	userController: new UserController(UserModelPrisma),
// 	// otros controladores aquí
// }

// mas simple pero se dajara el codigo parece que no es tan necesario

// export const getUserController = () => controllers['userController']
// mas simple - da error
// export function getController(controllerName: string) {
// 	return controllers[controllerName as keyof typeof controllers]
// }

// mas complejo soluciona pero muy verbose
// export function getController<T>(controllerName: string): T {
// 	return controllers[controllerName as keyof typeof controllers] as T
// }
