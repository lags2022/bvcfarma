import { Prisma, PrismaClient, Role } from '@prisma/client'
import { hashSync } from 'bcryptjs'

import { product_line, code_unit, category, subcategory } from './output.json'

const prisma = new PrismaClient()

export const COUNTRIES_SEED: Prisma.CountryCreateInput = {
	name: 'Peru',
	imageUrl: 'https://fonts.gstatic.com/s/e/notoemoji/15.1/1f1f5_1f1ea/72.png',
}

export const PRODUCT_LINES_SEED: Prisma.ProductLineCreateInput[] =
	product_line.map((productLine) => ({
		name: productLine.name,
	}))

export const DISTRIBUTION_TYPES_SEED: Prisma.DistributionTypeCreateInput[] = [
	{
		name: 'otc',
		description: 'medicamentos de venta libre',
		alias: 'over the counter',
	},
	{
		name: 'rx',
		description: 'medicamentos de prescripción médica',
		alias: 'prescription',
	},
]

export const CODE_UNITS_SEED: Prisma.CodeUnitCreateInput[] = code_unit.map(
	(codeUnit) => ({
		name: codeUnit.name,
	}),
)

export const CATEGORY_SEED: Prisma.CategoryCreateInput[] = category.map(
	(category) => ({
		name: category.name,
	}),
)

export const SUBCATEGORY_SEED = subcategory.map((subcategory) => ({
	name: subcategory.name,
	category: subcategory.category,
}))

const ORDERS_SEED_1: Prisma.OrderCreateNestedManyWithoutUserInput = {
	create: [
		{
			paymentMethod: 'CASH',
			status: 'DELIVERED',
			deliveryType: 'EXPRESS',
			quantityItems: 3,
			total: 36.97 + 31.98 + 19.99,
			paidAt: new Date('2024-08-25'),
			isPaid: true,
			observation: 'Observation lorem lorem lorem',
			transactionId: '234234234',
			documentUrl: 'Document1',
			ocNumber: 'OC01-00000001',
			totalCart: 36.97 + 31.98 + 19.99 - 10,
			discount: 10,
			subtotal: 36.97 + 31.98 + 19.99 - 10 - 6.5,
			shippingCost: 6.5,
			orderItems: {
				create: [
					{
						quantity: 3,
						priceAtTime: 4.99,
						subtotalItem: 3 * 4.99,
						nameProductBackup: 'aval jabon liq.antib.flor d manzano fco/400ml',
						imageProductBackup:
							'https://res.cloudinary.com/dma0cg8wn/image/upload/v1740156662/35_1740156662557.webp',
						productId: '05c57242-5e14-4220-bd8e-042848ae7b85',
					},
					{
						quantity: 1,
						priceAtTime: 27.88,
						subtotalItem: 1 * 27.88,
						nameProductBackup: 'gingisona b spray fco/15 ml',
						imageProductBackup:
							'https://res.cloudinary.com/dma0cg8wn/image/upload/v1740156561/1660_1740156561498.webp',
						productId: '0ba1be28-d8b1-4a6b-8f0b-9adf447bc2b7',
					},
				],
			},
			orderAddress: {
				create: {
					firstName: 'Luis',
					lastName: 'Angel',
					address: 'Calle 1',
					postalCode: '12345',
					phone: '123456789',
					department: 'Lima',
					province: 'Callao',
					district: 'Surco',
					email: 'lguzman.58erb@outlook.com',
					// city: 'Trujillo',
					country: {
						connect: {
							id: 1,
						},
					},
					typeDocument: 'DNI',
					numberDocument: '46568033',
					reference: 'Colegio Industrial de la Costa',
				},
			},
		},
		{
			paymentMethod: 'YAPE',
			status: 'ASSIGNED',
			deliveryType: 'STANDARD',
			quantityItems: 1,
			total: 229.9,
			paidAt: new Date('2024-08-28'),
			isPaid: true,
			observation: 'Observation lorem lorem lorem',
			transactionId: 'r3243254',
			documentUrl: 'Document2',
			ocNumber: 'OC01-00000002',
			totalCart: 229.9 - 10,
			discount: 10,
			subtotal: 229.9 - 10 - 4.5,
			shippingCost: 4.5,
			orderItems: {
				create: [
					{
						quantity: 2,
						priceAtTime: 47.5,
						subtotalItem: 2 * 47.5,
						nameProductBackup:
							'calcio forte cja/30 sachet.cit.calcio s/vainilla',
						imageProductBackup:
							'https://res.cloudinary.com/dma0cg8wn/image/upload/v1740156652/287_1740156652113.webp',
						productId: '4ba51d21-a9cd-4b96-a9d0-8cc63faebb97',
					},
				],
			},
		},
	],
}

// const ORDERS_SEED_2: Prisma.OrderCreateNestedManyWithoutUserInput = {
// 	create: [
// 		{
// 			paymentMethod: 'CARD',
// 			status: 'VALIDATING',
// 			deliveryType: 'PICKUP',
// 			quantityItems: 2,
// 			total: 2 * 7.99 + 6 * 9.99,
// 			totalCart: 2 * 7.99 + 6 * 9.99,
// 			discount: 0,
// 			subtotal: 2 * 7.99 + 6 * 9.99,
// 			shippingCost: 0,
// 			ocNumber: 'OC01-00000003',
// 			transactionId: 'transactionId1',
// 			orderItems: {
// 				create: [
// 					{
// 						quantity: 2,
// 						price: '7.99',
// 						idProductErp: 10,
// 						subtotalItem: 2 * 7.99,
// 						name: 'Producto 6',
// 						image:
// 							'https://images.ctfassets.net/buvy887680uc/3g7WoCHIBkSdufmBAYcGtA/52d0c655a7a8df27211c0eb109f3c248/Ninet-slider-mifarma-web-bx2.jpg',
// 					},
// 					{
// 						quantity: 6,
// 						price: '9.99',
// 						idProductErp: 2,
// 						subtotalItem: 6 * 9.99,
// 						name: 'Producto 5',
// 						image:
// 							'https://images.ctfassets.net/buvy887680uc/4PuzGQIi01rlBHWbivyUNo/8ac7d92f860927f32c06e16ca0928f4a/proxima-compra-setiembre-cross-slide-mifarma-web.jpg',
// 					},
// 				],
// 			},
// 		},
// 	],
// }

export const USERS_CREDENTIALS_TEST = [
	{
		name: 'Luis Angel',
		email: 'lguzman.58erb@outlook.com',
		password: 'usuario1pass',
		role: 'CUSTOMER',
	},
	{
		name: 'Propietario 1',
		email: 'cesac90.mro@gmail.com',
		password: 'owner1pass',
		role: 'OWNER',
	},
]

export const USERS_FIELD_TEST: Prisma.UserCreateInput[] = [
	{
		name: USERS_CREDENTIALS_TEST[0].name,
		email: USERS_CREDENTIALS_TEST[0].email,
		password: hashSync(USERS_CREDENTIALS_TEST[0].password, 10),
		favorites: [7, 4, 2, 10],
		orders: ORDERS_SEED_1,
		testField: true,
	},
	{
		name: USERS_CREDENTIALS_TEST[1].name,
		email: USERS_CREDENTIALS_TEST[1].email,
		password: hashSync(USERS_CREDENTIALS_TEST[1].password, 10),
		role: USERS_CREDENTIALS_TEST[1].role as Role,
		testField: true,
	},
]

export const USERS: Prisma.UserCreateInput[] = [
	{
		name: 'Luchex Admin',
		email: 'mdab.luis00825@gmail.com',
		password: hashSync('emulnor1865admin', 10),
		role: 'ADMIN',
	},
	{
		name: 'Farmacia 1',
		email: 'melcabo954@gmail.com',
		password: hashSync('emulnor1865pharmacy', 10),
		ruc: '12345678901',
		role: 'MERCHANT',
	},
	...USERS_FIELD_TEST,
	{
		name: 'User 2',
		email: 'user2@gmail.com',
		password: hashSync('user2fasd', 10),
		favorites: [5, 8],
		// orders: ORDERS_SEED_2,
		address: {
			create: {
				firstName: 'User2 first name',
				lastName: 'User2 last name',
				address: 'Calle 1',
				address2: 'Apartado 1',
				postalCode: '12345',
				phone: '123456789',
				city: 'Trujillo',
				country: {
					connect: {
						id: 1,
					},
				},
			},
		},
	},
]
