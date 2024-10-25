import { PrismaClient } from '@prisma/client'

import { USERS, COUNTRIES_SEED } from './data'

const prisma = new PrismaClient()

async function main() {
	try {
		// Borrar todos los registros de las tablas respetando las relaciones

		await prisma.orderItemProduct.deleteMany({})
		await prisma.userAddress.deleteMany({})
		await prisma.culqiCharge.deleteMany({})
		await prisma.orderAddress.deleteMany({})
		await prisma.country.deleteMany({})
		await prisma.order.deleteMany({})
		await prisma.user.deleteMany({})
		await prisma.fieldsAddProduct.deleteMany({})

		console.log('All records deleted.')

		// Crear country
		const countryCreated = await prisma.country.create({
			data: COUNTRIES_SEED,
		})

		console.log('Country created:', countryCreated)

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
