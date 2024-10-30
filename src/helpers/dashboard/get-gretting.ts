export function getGretting() {
	const horaActual = new Date().getHours()

	if (horaActual >= 6 && horaActual < 12) {
		return '¡Buenos días,'
	} else if (horaActual >= 12 && horaActual < 18) {
		return '¡Buenas tardes,'
	} else {
		return '¡Buenas noches,'
	}
}
