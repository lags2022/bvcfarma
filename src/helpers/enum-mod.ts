import { PaymentMethod, DeliveryType, TypeDocument, StatusOrder } from '@prisma/client'

import {
	PAYMENT_METHOD_MOD,
	DELIVERY_TYPE_MOD,
	TYPE_DOCUMENT_MOD,
  STATUS_ORDER_MOD,
} from '@/constants/enum-mod'

function formatEnum<T extends Record<string, string>>(
	enumPrisma: T,
	objectConst: { [key in keyof T]: string },
) {
	return Object.values(enumPrisma).map((value) => ({
		value,
		label: objectConst[value as keyof typeof objectConst],
	}))
}

export const formatPaymentMethod = formatEnum(PaymentMethod, PAYMENT_METHOD_MOD)

// Formatear métodos de envío
export const formatDeliveryType = formatEnum(DeliveryType, DELIVERY_TYPE_MOD)

// Formatear tipos de documentos
export const formatTypeDocument = formatEnum(TypeDocument, TYPE_DOCUMENT_MOD)

export const formatStatusOrder = formatEnum(StatusOrder, STATUS_ORDER_MOD)