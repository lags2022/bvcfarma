const { PrismaClient } = require('@prisma/client')
const path = require('path')
const XLSX = require('xlsx')

const prisma = new PrismaClient()

// -------------- CONFIGURACIÓN --------------

// Ruta del archivo Excel
const EXCEL_FILE = path.join(__dirname, 'productos.xlsx')

// -------------- FUNCIONES AUXILIARES --------------

/**
 * Limpia un string: trim + lowercase.
 * Si queda vacío, devolvemos null (para que en Prisma se guarde como null).
 * Si quieres, podrías devolver "" en vez de null. Ajusta a tu gusto.
 */
function cleanStringOrNull(value: string | null | undefined) {
	if (!value) return null // null, undefined, o campo vacío
	const trimmed = value.toString().trim()
	if (!trimmed) return null // si después de trim está vacío
	return trimmed.toLowerCase()
}

function determineExcelDateType(value: any) {
	if (value === null || value === undefined) {
		console.log('El valor es null o undefined.')
		return
	}

	// Si es un objeto Date
	if (typeof value === 'object' && value instanceof Date) {
		console.log('El valor es un objeto Date:', value)
		return
	}

	// Si es un número, podría ser un serial de Excel
	if (typeof value === 'number') {
		console.log(
			'El valor es un número (posiblemente un serial de Excel):',
			value,
		)
		return
	}

	// Si es una cadena de texto
	if (typeof value === 'string') {
		console.log('El valor es una cadena:', value)
		return
	}

	console.log('El valor es de un tipo inesperado:', typeof value, value)
}

/**
 * Convierte fecha con formato DD/MM/YYYY a objeto Date.
 * Si no es válido, devuelve null.
 */
function parseExcelDate(
	value: number | Date | string | null | undefined,
): Date | null {
	if (value === null || value === undefined || value === '') return null

	// Caso 1: Si es un objeto Date, lo retornamos directamente (si es válido)
	if (value instanceof Date) {
		return isNaN(value.getTime()) ? null : value
	}

	// Caso 2: Si es un número (serial de Excel)
	if (typeof value === 'number') {
		// Fórmula para convertir serial de Excel (sistema 1900) a Date:
		// 1 día = 86400000 ms, y Excel tiene un offset de 25569 días.
		return new Date((value - 25569) * 86400000)
	}

	// Caso 3: Si es un string, intentamos detectar el formato "DD/MM/YYYY"
	if (typeof value === 'string') {
		const trimmed = value.trim()
		if (!trimmed) return null
		const parts = trimmed.split('/')
		if (parts.length === 3) {
			const day = parseInt(parts[0], 10)
			const month = parseInt(parts[1], 10)
			const year = parseInt(parts[2], 10)
			if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
				return new Date(year, month - 1, day)
			}
		}
		// Si no es "DD/MM/YYYY", intentamos con el parseo nativo
		const d = new Date(trimmed)
		return isNaN(d.getTime()) ? null : d
	}

	return null
}

/**
 * Convierte valor a Float. Si no es válido o está vacío, devolvemos null.
 */
function toFloatOrNull(value: string | number | null | undefined) {
	if (!value) return null
	const trimmed = value.toString().trim()
	if (!trimmed) return null

	const parsed = parseFloat(trimmed)
	if (isNaN(parsed)) return null

	return parsed
}

/**
 * Convierte valor a Entero. Si no es válido o está vacío, devolvemos null.
 */
function toIntegerOrNull(value: string | number | null | undefined) {
	if (!value) return null
	const trimmed = value.toString().trim()
	if (!trimmed) return null

	const parsed = parseInt(trimmed, 10)
	if (isNaN(parsed)) return null

	return parsed
}

/**
 * Si un valor string está vacío, devolvemos null; si no, lo devolvemos tal cual (sin lowercase).
 * Esto es útil para campos como descripción, si no quieres forzar lowercase.
 */
function textOrNull(value: string | null | undefined) {
	if (!value) return null
	const trimmed = value.toString().trim()
	if (!trimmed) return null
	return trimmed
}

/**
 * Para boolean, si no hay nada, devolvemos true por defecto, o null, según prefieras.
 * Aquí lo dejaremos como null si está vacío.
 */
// function toBooleanOrNull(value: string | null | undefined) {
// 	if (!value) return null // sin dato -> null
// 	const trimmed = value.toString().trim().toLowerCase()
// 	if (trimmed === 'true') return true
// 	if (trimmed === 'false') return false
// 	return null
// }

// -------------- LÓGICA PRINCIPAL --------------

async function main() {
	try {
		// 1. Leer el archivo Excel
		const workbook = XLSX.readFile(EXCEL_FILE)

		// 2. Tomar la primera hoja (o la que necesites)
		const sheetName = workbook.SheetNames[0]
		const worksheet = workbook.Sheets[sheetName]

		// 3. Convertir hoja a un arreglo de objetos
		const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' }) as {
			id_excel: string | null
			name: string | null
			price_unit: string | null
			stock: string | null
			expiration: number | null
			lote: string | null
			image_url: string | null
			product_line: string | null
			code_unit: string | null
			category: string | null
			subcategory: string | null
			distribution_type: string | null
			type_offer: string | null
		}[]

		// Contador de productos creados y errores
		let productCounter = 0
		let errorCounter = 0
		const errorList = []

		// 4. Recorrer cada fila
		for (const row of rows) {
			// Comprobamos si hay image_url
			const imageUrl = textOrNull(row.image_url)
			if (!imageUrl) {
				// Si no tiene image_url, lo saltamos
				continue
			}

			// Asignar campos del Excel -> modelo Product
			// const slug = textOrNull(row.slug) // si está vacío -> null
			const productData = {
				idExcel: textOrNull(row.id_excel), // si está vacío -> null
				name: cleanStringOrNull(row.name)!, // lowercase
				priceUnit: toFloatOrNull(row.price_unit),
				stock: toIntegerOrNull(row.stock),
				expiration: parseExcelDate(row.expiration), // "DD/MM/YYYY"
				lote: cleanStringOrNull(row.lote), // lowercase
				imageUrl: imageUrl,
				// description: textOrNull(row.description), // no forzar lowercase
				// slug: slug,
				// si no quieres null, sino "", cámbialo a slug ?? ""
				// isActive: true,
				// si prefieres parsear isActive desde excel:
				// isActive: toBooleanOrNull(row.is_active) ?? true,
			}

			// ---------- RELACIONES (por nombre) ----------

			// PRODUCT_LINE
			const productLineName = cleanStringOrNull(row.product_line)
			let productLineConnect = undefined
			if (productLineName) {
				const productLine = await prisma.productLine.findFirst({
					where: { name: productLineName },
				})
				if (productLine) {
					productLineConnect = { connect: { id: productLine.id } }
				}
			}

			// CODE_UNIT
			const codeUnitName = cleanStringOrNull(row.code_unit)
			let codeUnitConnect = undefined
			if (codeUnitName) {
				const codeUnit = await prisma.codeUnit.findFirst({
					where: { name: codeUnitName },
				})
				if (codeUnit) {
					codeUnitConnect = { connect: { id: codeUnit.id } }
				}
			}

			// CATEGORY
			const categoryName = cleanStringOrNull(row.category)
			let categoryConnect = undefined
			if (categoryName) {
				const category = await prisma.category.findFirst({
					where: { name: categoryName },
				})
				if (category) {
					categoryConnect = { connect: { id: category.id } }
				}
			}

			// SUBCATEGORY
			const subCategoryName = cleanStringOrNull(row.subcategory)
			let subCategoryConnect = undefined
			if (subCategoryName) {
				// Si necesitas filtrar por categoría, ajusta la query
				const subCategory = await prisma.subCategory.findFirst({
					where: {
						name: subCategoryName,
						// Si quieres que coincida con la categoría:
						category: {
							name: categoryName!,
						},
					},
				})
				if (subCategory) {
					subCategoryConnect = { connect: { id: subCategory.id } }
				}
			}

			// DISTRIBUTION TYPE
			let distributionTypeName = cleanStringOrNull(row.distribution_type)
			let distributionTypeConnect = undefined
			if (distributionTypeName) {
				if (distributionTypeName === 'no otc') {
					distributionTypeName = 'rx'
				}

				const distributionType = await prisma.distributionType.findFirst({
					where: { name: distributionTypeName },
				})
				if (distributionType) {
					distributionTypeConnect = { connect: { id: distributionType.id } }
				}
			}

			// TYPE OFFER
			const typeOfferName = cleanStringOrNull(row.type_offer)
			let typeOfferConnect = undefined
			if (typeOfferName) {
				const typeOffer = await prisma.typeOffer.findFirst({
					where: { name: typeOfferName },
				})
				if (typeOffer) {
					typeOfferConnect = { connect: { id: typeOffer.id } }
				}
			}

			// 5. Crear el producto
			try {
				const createdProduct = await prisma.product.create({
					data: {
						...productData,
						// Conexiones con relaciones
						productLine: productLineConnect,
						codeUnit: codeUnitConnect,
						category: categoryConnect,
						subCategory: subCategoryConnect,
						distributionType: distributionTypeConnect,
						typeOffer: typeOfferConnect,
					},
				})

				productCounter++
				console.log(
					`${productCounter}. Producto creado: ID => ${createdProduct.idExcel} | name => ${createdProduct.name}`,
				)
			} catch (err: any) {
				errorCounter++
				const errorMessage = err.message || 'Error desconocido'
				errorList.push({
					idExcel: row.id_excel,
					name: row.name,
					error: errorMessage,
				})
				console.error(
					`Error creando producto con id_excel => ${row.id_excel}: ${errorMessage}`,
				)
			}
		}

		console.log(`Proceso de importación completado.`)
		console.log(`Productos creados: ${productCounter}`)
		console.log(`Errores: ${errorCounter}`)

		if (errorList.length > 0) {
			console.log('Detalle de productos con error:')
			errorList.forEach((err, index) => {
				console.log(
					`${index + 1}. id_excel: ${err.idExcel}, name: ${err.name} - ${err.error}`,
				)
			})
		}
	} catch (error: any) {
		console.error('Error general en la importación:', error.message)
	} finally {
		await prisma.$disconnect()
	}
}

// Ejecutar el script
main()
