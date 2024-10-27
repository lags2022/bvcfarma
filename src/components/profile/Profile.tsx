'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, FieldPath, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { deleteUser, updateUser } from '@/actions/user-action'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserWithSelectedAddressFields } from '@/interfaces/models'
import {
	UserUpdateProfileSchema,
	UserUpdateProfileSchemaType,
} from '@/schemas/profile-schema'

import { ProfileAlerts } from './ProfileAlerts'
import { ProfileImageUserUpdate } from './ProfileImageUserUpdate'

export const Profile = ({ user }: { user: UserWithSelectedAddressFields }) => {
	const INITIAL_VALUES = {
		name: user?.name || '',
		email: user.email,
		address: {
			firstName: user.address?.firstName || user?.name || '',
			lastName: user.address?.lastName || '',
			image: user.address?.image || '',
			phone: user.address?.phone || '',
			address: user.address?.address || '',
		},
	}

	const [isDeleting, setIsDeleting] = useState(false)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)

	const {
		control,
		setValue,
		trigger,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(UserUpdateProfileSchema),
		defaultValues: INITIAL_VALUES,
		// mode: 'onSubmit', // Solo validar al enviar el formulario
	})

	const handleChange = (
		name: FieldPath<UserUpdateProfileSchemaType>,
		value: string,
	) => {
		setValue(name, value)
		trigger(name)
	}

	const handleSetValueImage = (urlImage: string) => {
		setValue('address.image', urlImage)
		trigger('address.image')
	}

	const onSubmit = async (data: UserUpdateProfileSchemaType) => {
		try {
			if (!Object.keys(errors).length) {
				await updateUser(data)
				// await new Promise((resolve) => setTimeout(resolve, 20000))

				toast.success('Cambios realizados')
				return
			}

			toast.error('No se pudo enviar los cambios, revisa el formulario')
		} catch (error) {
			toast.error('No se pudo enviar los cambios')
		}
	}

	const handleDeleteUser = async () => {
		setIsDeleting(true)
		try {
			await deleteUser()
			toast.success('Cuenta eliminada')
		} catch (error) {
			toast.error('No se pudo eliminar la cuenta')
		} finally {
			setIsDeleting(false)
			setShowDeleteDialog(false)
		}
	}

	return (
		<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
			<ProfileImageUserUpdate
				handleSetValueImage={handleSetValueImage}
				isSubmitting={isSubmitting || isDeleting}
				image={user.address?.image || ''}
			/>

			<div className="grid gap-4 sm:grid-cols-2">
				{/* nombres */}
				<div className="space-y-2">
					<Label htmlFor="firstName">
						Nombres{' '}
						<span className="text-gray-400 font-normal text-xs">
							(Obligatorio)
						</span>
					</Label>
					<Controller
						name="address.firstName"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								id={field.name}
								type="text"
								value={field.value}
								// placeholder="Ingrese su nombre"
								onChange={(e) => handleChange(field.name, e.target.value)}
								disabled={isSubmitting || isDeleting}
							/>
						)}
					/>
					{errors.address?.firstName && (
						<p className="text-red-500 text-sm mt-1">
							{errors.address?.firstName.message}
						</p>
					)}
				</div>

				{/* apellidos */}
				<div className="space-y-2">
					<Label htmlFor="lastName">
						Apellidos{' '}
						<span className="text-gray-400 font-normal text-xs">
							(Opcional)
						</span>
					</Label>
					<Controller
						name="address.lastName"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								id={field.name}
								type="text"
								// placeholder="Ingrese su apellido"
								value={field.value}
								onChange={(e) => handleChange(field.name, e.target.value)}
								disabled={isSubmitting || isDeleting}
							/>
						)}
					/>
					{errors.address?.lastName && (
						<p className="text-red-500 text-sm mt-1">
							{errors.address?.lastName.message}
						</p>
					)}
				</div>

				{/* correo electronico */}
				<div className="space-y-2">
					<Label htmlFor="email">
						Correo electrónico{' '}
						<span className="text-gray-400 font-normal text-xs">
							(Obligatorio)
						</span>
					</Label>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								id={field.name}
								type="email"
								// placeholder="Ingrese su email"
								value={field.value}
								onChange={(e) => handleChange(field.name, e.target.value)}
								disabled={isSubmitting || isDeleting}
							/>
						)}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>

				{/* telefono */}
				<div className="space-y-2">
					<Label htmlFor="phone">
						Teléfono{' '}
						<span className="text-gray-400 font-normal text-xs">
							(Opcional)
						</span>
					</Label>
					<Controller
						name="address.phone"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								id={field.name}
								type="string"
								// placeholder="Ingrese su teléfono"
								value={field.value}
								onChange={(e) => handleChange(field.name, e.target.value)}
								disabled={isSubmitting || isDeleting}
							/>
						)}
					/>
					{errors.address?.phone && (
						<p className="text-red-500 text-sm mt-1">
							{errors.address?.phone.message}
						</p>
					)}
				</div>

				{/* direccion */}
				<div className="space-y-2 sm:col-span-2">
					<Label htmlFor="address">
						Dirección{' '}
						<span className="text-gray-400 font-normal text-xs">
							(Opcional)
						</span>
					</Label>
					<Controller
						name="address.address"
						control={control}
						render={({ field }) => (
							<Textarea
								{...field}
								id={field.name}
								// placeholder="Ingrese su dirección"
								value={field.value}
								onChange={(e) => handleChange(field.name, e.target.value)}
								disabled={isSubmitting || isDeleting}
							/>
						)}
					/>
					{errors.address?.address && (
						<p className="text-red-500 text-sm mt-1">
							{errors.address?.address.message}
						</p>
					)}
				</div>

				{/* contraseña */}
				<div className="flex gap-2">
					<p className="font-medium">Desea cambiar de constraseña?</p>
					{!isSubmitting && (
						<Link
							href="/profile/reset-password"
							className="text-picker-4 font-semibold hover:underline"
						>
							Click aquí
						</Link>
					)}
				</div>
			</div>

			<ProfileAlerts
				handleDeleteUser={handleDeleteUser}
				isSubmitting={isSubmitting}
				isDeleting={isDeleting}
				showDeleteDialog={showDeleteDialog}
				setShowDeleteDialog={setShowDeleteDialog}
			/>
		</form>
	)
}
