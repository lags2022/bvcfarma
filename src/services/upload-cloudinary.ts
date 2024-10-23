import { CLOUDINARY_CLOUD_NAME } from '@/constants/general'

export const uploadCloudinary = async (formData: FormData) => {
	try {
		const responseCloudinary = await fetch(
			`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
			{
				method: 'POST',
				body: formData,
			},
		)

		const data = await responseCloudinary.json()
		return data.secure_url
	} catch (error) {
		throw error
	}
}
