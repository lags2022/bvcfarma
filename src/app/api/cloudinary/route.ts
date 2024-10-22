import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { Readable } from 'stream' // Importar stream de Node.js

// Función para convertir un archivo en un stream legible de Node.js
function bufferToStream(buffer: Buffer) {
	const readable = new Readable()
	readable.push(buffer)
	readable.push(null) // Indica el final del stream
	return readable
}

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File

		if (!file) {
			return NextResponse.json(
				{
					message: 'No se subio un archivo de tipo imagen',
					typeError: 'errorNoFileUploaded',
				},
				{ status: 400 },
			)
		}

		// Convertir el archivo a un arrayBuffer
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer) // Convertir a buffer de Node.js

		// Convertir el buffer en un stream legible para Node.js
		const fileStream = bufferToStream(buffer)

		// Subir la imagen a Cloudinary usando el stream
		const uploadResult = await new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					resource_type: 'image',
					overwrite: true,
				},
				(error, result) => {
					if (error) {
						reject(error)
					} else {
						resolve(result)
					}
				},
			)

			// Pasar el stream del archivo al stream de Cloudinary
			fileStream.pipe(uploadStream)
		})

		// Verifica si el upload fue exitoso y devuelve la URL
		const { secure_url } = uploadResult as { secure_url: string }

		return NextResponse.json({ url: secure_url }, { status: 200 })
	} catch (error) {
		console.error(error, 'Error en cloudinary')
		return NextResponse.json(
			{
				message: 'Error al subir la imagen.',
				typeError: 'errorUploadImageToCloudinary',
			},
			{ status: 500 },
		)
	}
}
