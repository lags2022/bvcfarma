export const DELIVERY_COST = {
	EXPRESS: 6.5,
	STANDARD: 4.5,
	PICKUP: 0,
}

export const PAYMENT_METHOD_MOD = {
	CARD: 'tarjeta de crédito/débito',
	YAPE: 'yape',
	CASH: 'efectivo',
	TRANSFER: 'transferencia',
	POS: 'pos',
} as const

export const DELIVERY_TYPE_MOD = {
	EXPRESS: `Envío a domicilio - Express (S/ ${DELIVERY_COST.EXPRESS})`,
	STANDARD: `Envío a domicilio - Standard (S/ ${DELIVERY_COST.STANDARD})`,
	PICKUP: 'Recojo en tienda',
} as const

export const TYPE_DOCUMENT_MOD = {
	DNI: 'DNI',
	PASSPORT: 'Pasaporte',
	FOREIGNER_CARD: 'Carnet de extranjería',
} as const

export const STATUS_ORDER_MOD = {
	CANCELLED: 'Cancelado',
	VALIDATING: 'Validando',
	PREPARING: 'Preparando',
	ASSIGNED: 'Asignado',
	DELIVERED: 'Entregado',
} as const

export const ROLE_MOD = {
	CUSTOMER: 'Usuario',
	MERCHANT: 'Farmacia',
	ADMIN: 'Administrador',
	OWNER: 'Propietario',
} as const