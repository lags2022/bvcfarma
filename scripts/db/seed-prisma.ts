import { PrismaClient } from '@prisma/client'

import {
	// USERS,
	COUNTRIES_SEED,
	PRODUCT_LINES_SEED,
	CODE_UNITS_SEED,
	DISTRIBUTION_TYPES_SEED,
	CATEGORY_SEED,
	SUBCATEGORY_SEED,
	USERS,
} from './data'

const prisma = new PrismaClient()

async function main() {
	try {
		// Borrar todos los registros de las tablas respetando las relaciones

		// await prisma.orderItemProduct.deleteMany({})
		// await prisma.userAddress.deleteMany({})
		// await prisma.culqiCharge.deleteMany({})
		// await prisma.orderAddress.deleteMany({})
		// await prisma.country.deleteMany({})
		// await prisma.order.deleteMany({})
		// await prisma.user.deleteMany({})
		// await prisma.product.deleteMany({})
		// await prisma.productLine.deleteMany({})
		// await prisma.category.deleteMany({})
		// await prisma.subCategory.deleteMany({})
		// await prisma.distributionType.deleteMany({})
		// await prisma.typeOffer.deleteMany({})
		// await prisma.codeUnit.deleteMany({})

		// console.log('All records deleted.')

		// // Crear country
		// const countryCreated = await prisma.country.create({
		// 	data: COUNTRIES_SEED,
		// })

		// console.log('Country created:', countryCreated)

		// // Crear varios productLines
		// for (const productLine of PRODUCT_LINES_SEED) {
		// 	const productLineCreated = await prisma.productLine.create({
		// 		data: productLine,
		// 	})
		// 	console.log('ProductLine created:', productLineCreated)
		// }

		// // crear codeUnits
		// for (const codeUnit of CODE_UNITS_SEED) {
		// 	const codeUnitCreated = await prisma.codeUnit.create({
		// 		data: codeUnit,
		// 	})
		// 	console.log('CodeUnit created:', codeUnitCreated)
		// }

		// // Crear distributionTypes
		// for (const type of DISTRIBUTION_TYPES_SEED) {
		// 	const distributionType = await prisma.distributionType.create({
		// 		data: type,
		// 	})
		// 	console.log('Distribution:', distributionType)
		// }

		// // Crear category
		// for (const category of CATEGORY_SEED) {
		// 	const categoryCreated = await prisma.category.create({
		// 		data: category,
		// 	})
		// 	console.log('Category:', categoryCreated)
		// }

		// // Crear subcategory
		// for (const subcategory of SUBCATEGORY_SEED) {
		// 	const category = await prisma.category.findFirst({
		// 		where: {
		// 			name: subcategory.category,
		// 		},
		// 	})

		// 	const subcategoryCreated = await prisma.subCategory.create({
		// 		data: {
		// 			name: subcategory.name,
		// 			category: {
		// 				connect: {
		// 					id: category?.id,
		// 				},
		// 			},
		// 		},
		// 	})

		// 	console.log('Subcategory:', subcategoryCreated)
		// }

		// Crear nuevos registros users
		for (const user of USERS) {
			const userCreated = await prisma.user.create({
				data: user,
			})
			console.log('User created:', userCreated)
		}
	} catch (err) {
		console.error('Error deleting records or creating users:', err)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
	}
}

main()
