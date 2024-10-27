'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, FieldPath, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { updatePassword } from '@/actions/user-action'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	UserUpdatePasswordSchema,
	UserUpdatePasswordSchemaType,
} from '@/schemas/profile-schema'

const INITIAL_VALUES = {
	password: '',
	confirmPassword: '',
}

export default function PageResetPassword() {
	const [showPassword, setShowPassword] = useState(false)

	const {
		control,
		setValue,
		trigger,
		formState: { errors, isSubmitting },
		handleSubmit,
		watch,
		clearErrors,
	} = useForm({
		resolver: zodResolver(UserUpdatePasswordSchema),
		defaultValues: INITIAL_VALUES,
	})

	const handleChange = (
		name: FieldPath<UserUpdatePasswordSchemaType>,
		value: string,
	) => {
		setValue(name, value)
		trigger(name)
	}

	// Observa el valor de newPassword
	const newPassword = watch('password')

	useEffect(() => {
		if (newPassword) {
			// Si hay contenido en newPassword, dispara la validación de confirmPassword
			trigger('confirmPassword')
		} else {
			// Si se borra newPassword, limpia el error de confirmPassword
			clearErrors('confirmPassword')
		}
	}, [newPassword, trigger, clearErrors])

	const onSubmit = async (data: UserUpdatePasswordSchemaType) => {
		try {
			if (!Object.keys(errors).length && data.password) {
				const updatedPassword = await updatePassword(data.password)

				toast.success(updatedPassword?.message!)
				setValue('password', '')
				setValue('confirmPassword', '')
				return
			}

			toast.error('No se pudo enviar los cambios, revisa el formulario')
		} catch (error) {
			toast.error('No se pudo enviar los cambios')
		}
	}

	return (
		<form
			className="flex flex-col justify-center items-center gap-6 w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
				<div className="space-y-2 w-full flex-grow relative">
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
									onChange={(e) => handleChange(field.name, e.target.value)}
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
										{showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
									</span>
								</Button>
							</div>
						)}
					/>
					{errors.password && (
						<p className="text-red-500 absolute text-xs -bottom-4 left-0">
							{errors.password.message}
						</p>
					)}
				</div>
				<div className="space-y-2 w-full flex-grow relative">
					<Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<div className="relative">
								<Input
									{...field}
									id={field.name}
									type={'password'}
									value={field.value}
									onChange={(e) => handleChange(field.name, e.target.value)}
									disabled={isSubmitting}
								/>
							</div>
						)}
					/>
					{errors.confirmPassword && (
						<p className="text-red-500 absolute text-xs -bottom-4 left-0">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>
			</div>
			<div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4">
				<ButtonGeneral disabled={isSubmitting} className="w-full sm:w-auto" href="/profile">
					Ir a atrás
				</ButtonGeneral>
				<ButtonGeneral className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<LoaderCircle className="animate-spin mr-2" />
							Cambiando...
						</>
					) : (
						'Cambiar contraseña'
					)}
				</ButtonGeneral>
			</div>
		</form>
	)
}
