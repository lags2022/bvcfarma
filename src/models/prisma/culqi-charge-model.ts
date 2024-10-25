import { CulqiCharge, Prisma } from '@prisma/client'

import { executeAction } from '@/helpers/execute-action'
import {
	CulqiChargeModelConstructor,
	CulqiChargeModelImplements,
} from '@/interfaces/models'
import prisma from '@/lib/prisma'
import { staticImplements } from '@/lib/static'

@staticImplements<CulqiChargeModelConstructor>()
export class CulqiChargeModelPrisma implements CulqiChargeModelImplements {
	static async create(
		data: Prisma.CulqiChargeCreateInput,
	): Promise<CulqiCharge> {
		return executeAction(async () => {
			const culqiChargeCreated = await prisma.culqiCharge.create({
				data,
			})

			return culqiChargeCreated
		})
	}
}
