'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, FieldPath, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { deleteUser, updateUser } from '@/actions/user-action'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UserWithSelectedAddressFields } from '@/interfaces/models'
import {
	UserUpdateProfileSchema,
	UserUpdateProfileSchemaType,
} from '@/schemas/profile-schema'

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
		<div className="container mx-auto text-sm p-4">
			<Card className="max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle className="text-lg font-bold">Perfil de Usuario</CardTitle>
					<CardDescription>
						Actualiza tu información personal y configuración de la cuenta
					</CardDescription>
				</CardHeader>
				<CardContent>
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
									<p className="text-red-500 text-sm mt-1">
										{errors.email.message}
									</p>
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
							{/* <div className="space-y-2">
								<Label htmlFor="password">Nueva contraseña</Label>
								<Controller
									name="password"
									control={control}
									render={({ field }) => (
										<div className="relative">
											<Input
												{...field}
												id={field.name}
												type={showPassword ? 'text' : 'password'}
												// placeholder="Ingrese su password"
												value={field.value}
												onChange={(e) =>
													handleChange(field.name, e.target.value)
												}
												disabled={isSubmitting}
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
												onClick={() => setShowPassword(!showPassword)}
												disabled={isSubmitting}
											>
												{showPassword ? (
													<EyeOffIcon className="h-4 w-4" />
												) : (
													<EyeIcon className="h-4 w-4" />
												)}
												<span className="sr-only">
													{showPassword
														? 'Ocultar contraseña'
														: 'Mostrar contraseña'}
												</span>
											</Button>
										</div>
									)}
								/>
								{errors.password && (
									<p className="text-red-500 text-sm mt-1">
										{errors.password.message}
									</p>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									Confirmar nueva contraseña
								</Label>
								<Controller
									name="confirmPassword"
									control={control}
									render={({ field }) => (
										<div className="relative">
											<Input
												{...field}
												id={field.name}
												type={showPassword ? 'text' : 'password'}
												// placeholder="Confirmar nueva contraseña"
												value={field.value}
												onChange={(e) =>
													handleChange(field.name, e.target.value)
												}
												disabled={isSubmitting}
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
												onClick={() => setShowPassword(!showPassword)}
												disabled={isSubmitting}
											>
												{showPassword ? (
													<EyeOffIcon className="h-4 w-4" />
												) : (
													<EyeIcon className="h-4 w-4" />
												)}
												<span className="sr-only">
													{showPassword
														? 'Ocultar contraseña'
														: 'Mostrar contraseña'}
												</span>
											</Button>
										</div>
									)}
								/>
								{errors.confirmPassword && (
									<p className="text-red-500 text-sm mt-1">
										{errors.confirmPassword.message}
									</p>
								)}
							</div> */}
						</div>

						<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
							<Button
								type="submit"
								className="w-full sm:w-auto bg-picker-3 hover:bg-picker-4"
								disabled={isSubmitting || isDeleting}
							>
								{isSubmitting ? (
									<>
										<LoaderCircle className="animate-spin mr-2" />
										Guardando...
									</>
								) : (
									'Guardar cambios'
								)}
							</Button>
							<AlertDialog
								open={showDeleteDialog || isDeleting}
								onOpenChange={(open) =>
									!isDeleting && setShowDeleteDialog(open)
								}
							>
								<AlertDialogTrigger asChild>
									<Button
										variant="destructive"
										className="w-full focus-visible:ring-red-500 focus-visible:ring-offset-red-500 sm:w-auto"
										disabled={isSubmitting || isDeleting}
										onClick={() => setShowDeleteDialog(true)}
									>
										Borrar cuenta
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											{isDeleting
												? 'Borrando cuenta...'
												: '¿Estás seguro de que quieres borrar tu cuenta?'}
										</AlertDialogTitle>
										<AlertDialogDescription>
											{isDeleting
												? 'Por favor, espera mientras eliminamos tu cuenta y todos los datos asociados.'
												: 'Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos los datos asociados a ella.'}
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel disabled={isSubmitting || isDeleting}>
											Cancelar
										</AlertDialogCancel>
										<AlertDialogAction
											className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
											onClick={handleDeleteUser}
											disabled={isDeleting}
										>
											{isDeleting ? (
												<>
													<LoaderCircle className="animate-spin mr-2" />
													Borrando...
												</>
											) : (
												'Borrar cuenta'
											)}
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
