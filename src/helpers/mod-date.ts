import { format } from '@formkit/tempo'

export function modDate(date: Date, parseFormat = 'DD/MM/YYYY') {
	return format(date, parseFormat, 'es-PE')
}
