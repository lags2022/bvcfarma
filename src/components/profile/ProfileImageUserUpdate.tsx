'use client'

import { X, Image as ImageIcon, User } from 'lucide-react'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

import {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_UPLOAD_PRESET,
	GOOGLE_API_IMAGE_SEARCH,
} from '@/constants/general'
import { uploadCloudinary } from '@/services/upload-cloudinary'

type PreviewImage = {
	file: File | null
	url: string
	previewUrl: string
	name: string
}

const INITIAL_PREVIEW = {
	file: null,
	url: '',
	previewUrl: '',
	name: '',
}

export const ProfileImageUserUpdate = () => {
	const [preview, setPreview] = useState<PreviewImage>(INITIAL_PREVIEW)

	// Handler para cuando se carga una imagen usando Cloudinary
	const handleUpload = (result: any) => {
		if (result.event === 'success') {
			setPreview({
				url: result.info.secure_url,
				name:
					`${result.info.original_filename}.${result.info.format}` || 'imagen',
				previewUrl: result.info.secure_url,
				file: null,
			})
			return
		}
		toast.error('Error al subir la imagen')
	}

	const onDrop = async (acceptedFiles: File[]) => {
		try {
			const selectedFile = acceptedFiles[0]
			const previewUrl = URL.createObjectURL(selectedFile)
			setPreview({
				file: selectedFile,
				url: '',
				previewUrl,
				name: selectedFile.name || 'imagen',
			})

			const formData = new FormData()
			formData.append('file', selectedFile)
			formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			formData.append('cloud_name', CLOUDINARY_CLOUD_NAME)

			// Subir imagen a Cloudinary
			const url = await uploadCloudinary(formData)
			setPreview((prev) => ({ ...prev, url }))
		} catch (error: any) {
			console.error(error)
			setPreview(INITIAL_PREVIEW)
			toast.error('Error al subir la imagen')
		}
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': [],
		},
		maxFiles: 1,
		noClick: true, // Evitamos que el click abra la selección de archivos por el navegador
	})

	const removeImage = () => {
		setPreview(INITIAL_PREVIEW)
	}

	console.log('preview', preview)

	return (
		<div className="relative w-full max-w-xs h-52 flex flex-col justify-start items-center mx-auto">
			{/* previa de la imagen */}
			{preview.previewUrl && (
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

			{/* Componente de carga de imagen con Cloudinary */}
			<CldUploadButton
				uploadPreset={CLOUDINARY_UPLOAD_PRESET} // Preset de Cloudinary
				options={{
					sources: [
						'local',
						'camera',
						'image_search',
						'url',
						// 'facebook', // ya no es soportado
						// 'dropbox',
						// 'instagram', // ya no es soportado
						// 'gettyimages',
					], // Opciones de fuentes de carga
					multiple: false,
					resourceType: 'image',
					maxFiles: 1,
					googleApiKey: GOOGLE_API_IMAGE_SEARCH,
					cropping: true,
					croppingShowDimensions: true,
					croppingAspectRatio: 1, // aspect ratio for cropped image
					showSkipCropButton: true, // hide the "Skip" button during cropping
					croppingShowBackButton: true, // show "Back" button during cropping
					styles: {
						palette: {
							window: '#FFFFFF',
							sourceBg: '#F4F4F5',
							windowBorder: '#90A0B3',
							tabIcon: '#0078FF',
							inactiveTabIcon: '#69778A',
							menuIcons: '#555A5F',
							link: '#0078FF',
							action: '#FF620C',
							inProgress: '#0078FF',
							complete: '#20B832',
							error: '#F44235',
							textDark: '#000000',
							textLight: '#FFFFFF',
						},
					},
					// onUpload: handleUpload,
				}}
				onSuccess={handleUpload}
				onError={(error) => {
					console.error(error)
					setPreview(INITIAL_PREVIEW)
					toast.error('Error al subir la imagen')
				}}
				className="mx-auto"
			>
				{/* funcion con react-dropzone */}
				<div
					{...getRootProps()}
					className={`relative size-44 border-4 border-dashed rounded-full overflow-hidden cursor-pointer transition-colors ${
						isDragActive
							? 'border-picker-4 bg-picker-4/10'
							: 'border-gray-300 hover:border-picker-3'
					}`}
				>
					<input {...getInputProps()} />
					<div className="absolute inset-0 flex items-center justify-center">
						{preview.previewUrl ? (
							<Image
								src={preview.previewUrl}
								alt="Vista previa"
								width={150}
								height={150}
								className="aspect-square size-full object-contain"
							/>
						) : (
							<div className="text-center p-4">
								<User className="size-10 mx-auto text-gray-400 mb-2" />
								<p className="text-sm font-semibold text-gray-500">
									Subir foto
								</p>
								<p className="text-xs text-gray-400 mt-2">
									Haz clic para seleccionar o arrastra una imagen
								</p>
							</div>
						)}
					</div>
				</div>
			</CldUploadButton>

			{/* Información de la imagen subida */}
			{preview.name && (
				<div className="text-center max-w-xs mx-auto">
					<p className="text-xs flex justify-center items-center text-primary mt-2">
						<ImageIcon className="inline-block size-3 mr-1" />
						Para modificar arrastra y suelta o haz click arriba
					</p>
					<p className="text-xs text-gray-600 truncate">
						Imagen subida: <span className="font-semibold">{preview.name}</span>
					</p>
				</div>
			)}
		</div>
	)
}
