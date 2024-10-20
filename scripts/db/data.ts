import { Prisma, Role } from '@prisma/client'
import { hashSync } from 'bcryptjs'

export const COUNTRIES_SEED: Prisma.CountryCreateInput = {
	name: 'Peru',
	imageUrl: 'https://fonts.gstatic.com/s/e/notoemoji/15.1/1f1f5_1f1ea/72.png',
}

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
						price: '12.99',
						idProductErp: 1,
						subtotalItem: 36.97,
						name: 'Producto 1',
						image:
							'https://images.ctfassets.net/buvy887680uc/1TejabkjhW0SdMGyFtf5cL/1f66c48168d1224b0c951770630f1227/Larocheposay-effaclar-cremas-dermocosmetica-mifarma-bx4-web.jpg',
					},
					{
						quantity: 2,
						price: '15.49',
						idProductErp: 3,
						subtotalItem: 31.98,
						name: 'Producto 2',
						image:
							'https://images.ctfassets.net/buvy887680uc/3jsNYQl6jbAorUqxeRmDo7/41682010c8219c60e6c8ce352352c114/Packvital-nutricionadulto-mifarma-bannerhomelist-web.jpg',
					},
					{
						quantity: 1,
						price: '19.99',
						idProductErp: 7,
						subtotalItem: 19.99,
						name: 'Producto 3',
						image:
							'https://images.ctfassets.net/buvy887680uc/48Lm3iib8PC6tEAK1Qy7Ko/9cdf07cda7b2adbaab20ecc151bdf6cc/Larocheposay-anthelios-dermocosmetica-mifarma-bx4-web.jpg',
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
					countryId: 1,
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
						quantity: 10,
						price: '22.99',
						idProductErp: 5,
						subtotalItem: 229.9,
						name: 'Producto 4',
						image:
							'https://images.ctfassets.net/buvy887680uc/5d8g6FglN95UTPX38tSt0X/36ac63c5ba605fdee09a6934761a70d2/multicategoria-cross-slide-mifarma-web-bx1__1_.jpg',
					},
				],
			},
		},
	],
}

const ORDERS_SEED_2: Prisma.OrderCreateNestedManyWithoutUserInput = {
	create: [
		{
			paymentMethod: 'CARD',
			status: 'VALIDATING',
			deliveryType: 'PICKUP',
			quantityItems: 2,
			total: 2 * 7.99 + 6 * 9.99,
			totalCart: 2 * 7.99 + 6 * 9.99,
			discount: 0,
			subtotal: 2 * 7.99 + 6 * 9.99,
			shippingCost: 0,
			ocNumber: 'OC01-00000003',
			transactionId: 'transactionId1',
			orderItems: {
				create: [
					{
						quantity: 2,
						price: '7.99',
						idProductErp: 10,
						subtotalItem: 2 * 7.99,
						name: 'Producto 6',
						image:
							'https://images.ctfassets.net/buvy887680uc/3g7WoCHIBkSdufmBAYcGtA/52d0c655a7a8df27211c0eb109f3c248/Ninet-slider-mifarma-web-bx2.jpg',
					},
					{
						quantity: 6,
						price: '9.99',
						idProductErp: 2,
						subtotalItem: 6 * 9.99,
						name: 'Producto 5',
						image:
							'https://images.ctfassets.net/buvy887680uc/4PuzGQIi01rlBHWbivyUNo/8ac7d92f860927f32c06e16ca0928f4a/proxima-compra-setiembre-cross-slide-mifarma-web.jpg',
					},
				],
			},
		},
	],
}

export const USERS_CREDENTIALS_TEST = [
	{
		email: 'lguzman.58erb@outlook.com',
		password: 'usuario1pass',
		role: 'CUSTOMER',
	},
	{
		email: 'cesac90.mro@gmail.com',
		password: 'usuario2pass',
		role: 'OWNER',
	},
]

export const USERS_FIELD_TEST: Prisma.UserCreateInput[] = [
	{
		name: 'Usuario 1',
		email: USERS_CREDENTIALS_TEST[0].email,
		password: hashSync(USERS_CREDENTIALS_TEST[0].password, 10),
		favorites: [7, 4, 2, 10],
		orders: ORDERS_SEED_1,
		testField: true,
	},
	{
		name: 'Propietario 1',
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
		orders: ORDERS_SEED_2,
		address: {
			create: {
				firstName: 'User2 first name',
				lastName: 'User2 last name',
				address: 'Calle 1',
				address2: 'Apartado 1',
				postalCode: '12345',
				phone: '123456789',
				city: 'Trujillo',
				countryId: 1,
			},
		},
	},
]
