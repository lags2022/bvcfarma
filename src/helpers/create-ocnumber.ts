export function createOcNumber(ocNumber?: string) {
	// Extraer el número y calcular el siguiente
	const lastOcNumber = ocNumber
		? parseInt(ocNumber.split('-')[1])
		: 0
	const newOcNumber = lastOcNumber + 1

	// Formatear el nuevo `formattedNumberOrder`
	const formattedOcNumberOrder = `OC01-${newOcNumber.toString().padStart(8, '0')}`

	return formattedOcNumberOrder
}
