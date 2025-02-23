const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

// 1. Ruta de tu archivo Excel (cambia "tu_archivo.xlsx" si es necesario)
const EXCEL_FILE_PATH = path.join(__dirname, 'productos.xlsx')

// 2. Lee el libro de Excel y selecciona la primera hoja
const workbook = XLSX.readFile(EXCEL_FILE_PATH)
const sheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[sheetName]

// 3. Convierte la hoja en un arreglo de objetos
const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' })

// 4. Sets y Maps para eliminar duplicados
const productLinesSet = new Set()
const codeUnitsSet = new Set()
const categoriesSet = new Set()

// Usamos un Map para relacionar subcategory -> { name, category }
// y evitar duplicados
const subcategoryMap = new Map()

/**
 * Limpia un string: trim + lowercase
 * Evita valores nulos/undefined.
 */
function cleanString(value) {
	return (value || '').toString().trim().toLowerCase()
}

// 5. Recorre todas las filas para llenar los Sets/Map
rows.forEach((row) => {
	const productLine = cleanString(row.product_line)
	const codeUnit = cleanString(row.code_unit)
	const category = cleanString(row.category)
	const subcategory = cleanString(row.subcategory)

	if (productLine) productLinesSet.add(productLine)
	if (codeUnit) codeUnitsSet.add(codeUnit)
	if (category) categoriesSet.add(category)

	if (subcategory) {
		// Generamos una llave única subcategory||category
		// para no duplicar subcategorías de la misma categoría
		const key = `${subcategory}||${category}`
		if (!subcategoryMap.has(key)) {
			subcategoryMap.set(key, {
				name: subcategory,
				category: category,
			})
		}
	}
})

// 6. Transformamos los Sets/Map a Arrays con id incremental
// product_line
const product_line = Array.from(productLinesSet).map((name, index) => ({
	id: index + 1,
	name,
}))

// code_unit
const code_unit = Array.from(codeUnitsSet).map((name, index) => ({
	id: index + 1,
	name,
}))

// category
const category = Array.from(categoriesSet).map((name, index) => ({
	id: index + 1,
	name,
}))

// subcategory (sacamos los values del Map y agregamos id incremental)
const subcategoryValues = Array.from(subcategoryMap.values())
const subcategory = subcategoryValues.map((obj, index) => ({
	id: index + 1,
	...obj,
}))

// 7. Construimos el objeto final
const result = {
	product_line,
	code_unit,
	category,
	subcategory,
}

// 8. Guardamos en un archivo JSON
const outputPath = path.join(__dirname, 'output.json')
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8')

console.log(`JSON generado con éxito en '${outputPath}'`)
