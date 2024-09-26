export function formatString(str: string) {
	return str
		.toLowerCase() // Convierte todo a minúsculas
		.split('_') // Separa el string en palabras usando el _
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Pone en mayúscula la primera letra de cada palabra
		.join(' ') // Une las palabras con un espacio
}
