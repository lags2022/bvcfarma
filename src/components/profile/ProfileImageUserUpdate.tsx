'use client'

import { X, Upload, Image as ImageIcon, User } from 'lucide-react'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export const ProfileImageUserUpdate = () => {
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)

	const onDrop = async (acceptedFiles: File[]) => {
		try {
			const selectedFile = acceptedFiles[0]
			setFile(selectedFile)
			const previewUrl = URL.createObjectURL(selectedFile)
			setPreview(previewUrl)

			const formData = new FormData()
			formData.append('file', selectedFile) // 'file' es el archivo de imagen

			const responseCloudinary = await fetch(`/api/cloudinary`, {
				method: 'POST',
				body: formData,
			})

			const data = await responseCloudinary.json()

			if (
				['errorNoFileUploaded', 'errorUploadImageToCloudinary'].includes(
					data?.typeError as string,
				)
			) {
				throw new Error(data?.message)
			}

			console.log(data?.url, 'URL de la imagen')
		} catch (error: any) {
			console.error(error)
			toast.error(error.message)
		}
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
		maxFiles: 1,
	})

	const removeImage = () => {
		setFile(null)
		setPreview(null)
	}

	return (
		<div className="relative w-full max-w-xs h-52 mx-auto">
			{preview && (
				<button
					onClick={(e) => {
						e.stopPropagation()
						removeImage()
					}}
					className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-"
					aria-label="Eliminar imagen"
				>
					<X className="w-4 h-4" />
				</button>
			)}
			<div
				{...getRootProps()}
				className={`relative size-44 mx-auto border-4 border-dashed rounded-full overflow-hidden cursor-pointer transition-colors ${
					isDragActive
						? 'border-picker-4 bg-picker-4/10'
						: 'border-gray-300 hover:border-picker-3'
				}`}
			>
				<input {...getInputProps()} />
				<div className="absolute inset-0 flex items-center justify-center">
					{preview ? (
						<Image
							src={preview}
							alt="Vista previa"
							width={150}
							height={150}
							className="aspect-square size-full object-contain"
						/>
					) : (
						<div className="text-center p-4">
							<User className="size-10 mx-auto text-gray-400 mb-2" />
							<p className="text-sm font-semibold text-gray-500">Subir foto</p>
							<p className="text-xs text-gray-400 mt-2">
								Arrastra y suelta o haz clic para seleccionar la imagen
							</p>
						</div>
					)}
				</div>
			</div>
			{file && (
				<div className="text-center max-w-xs mx-auto">
					<p className="text-xs flex justify-center items-center text-primary mt-2">
						<ImageIcon className="inline-block size-3 mr-1" />
						Para modificar arrastra y suelta o haz click arriba
					</p>
					{file.name && (
						<p className="text-xs text-gray-600 truncate">
							Imagen subida: <span className="font-semibold">{file.name}</span>
						</p>
					)}
				</div>
			)}
		</div>
	)
}
