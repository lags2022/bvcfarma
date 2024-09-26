export function pluralizeWord({
	quantity,
	singular,
	language = 'es',
}: {
	quantity: number
	singular: string
	language?: string
}) {
	// Si la cantidad es 1, devuelve la palabra en singular
	if (quantity === 1) {
		return `${quantity} ${singular}`
	}

	// Si la palabra termina en vocal, simplemente añade "s"
	if (/[aeiouáéíóú]$/.test(singular)) {
		return `${quantity} ${singular}s`
	} else if (language === 'en') {
		// Si la palabra termina en vocal, simplemente añade "s"
		if (/[aeiouáéíóúm]$/.test(singular)) {
			return `${quantity} ${singular}s`
		}
	}

	// Si la palabra termina en consonante, añade "es"
	if (/[bcdfghjklmnñpqrstvwxyz]$/.test(singular)) {
		return `${quantity} ${singular}es`
	}

	// Si la palabra termina en "z", reemplaza "z" con "ces"
	if (singular.endsWith('z')) {
		return `${quantity} ${singular.slice(0, -1)}ces`
	}

	// Devolver el singular por defecto en caso de no cumplir ninguna de las reglas
	return `${quantity} ${singular}`
}
