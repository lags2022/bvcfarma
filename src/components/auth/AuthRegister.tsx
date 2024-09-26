'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { registerAction } from '@/actions/auth-action'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const AuthRegister = () => {
	const [showRegisterPassword, setShowRegisterPassword] = useState(false)

	const handleSubmit = async (formData: FormData) => {
		try {
			if (
				!formData.get('name') &&
				!formData.get('email') &&
				!formData.get('password')
			)
				return

			await registerAction(formData)

      toast.success('Registro exitoso')

      // toast.promise(result, {
			// 	loading: "Registrando...",
			// 	success: 'Registro exitoso',
			// 	error: 'Error al registrarse',
			// })

			// toast({
			// 	description: result?.error ? result?.message : 'Registro exitoso',
			// 	variant: result?.error ? 'destructive' : 'default',
			// })
		} catch (error) {
      console.log(`Error al registrarse: ${error}`)
      toast.error('Error al registrarse')
			// toast({
			// 	description: 'Error al registrarse',
			// 	variant: 'destructive',
			// })
		}
	}

	return (
		<div className="w-1/2 p-8 bg-gray-50">
			<h2 className="text-2xl font-bold mb-4">Registrarse</h2>
			<p className="text-gray-600 mb-6">¿No tienes una cuenta? Regístrate</p>
			<form action={handleSubmit} className="space-y-4">
				<div>
					{/* <Label htmlFor="name">Nombre</Label> */}
					<Input
						type="text"
						name="name"
						placeholder="Nombre"
						className="focus-visible:ring-picker-3"
					/>
				</div>
				<div>
					{/* <Label htmlFor="email-register">
        Dirección de correo electrónico
      </Label> */}
					<Input
						name="email"
						type="email"
						placeholder="Dirección de correo electrónico"
						className="focus-visible:ring-picker-3"
					/>
				</div>
				<div>
					{/* <Label htmlFor="password-register">Crear contraseña</Label> */}
					<div className="relative">
						<Input
							name="password"
							type={showRegisterPassword ? 'text' : 'password'}
							placeholder="Crear contraseña"
							className="focus-visible:ring-picker-3"
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
							onClick={() => setShowRegisterPassword(!showRegisterPassword)}
						>
							{showRegisterPassword ? (
								<EyeOffIcon className="h-4 w-4" />
							) : (
								<EyeIcon className="h-4 w-4" />
							)}
							<span className="sr-only">
								{showRegisterPassword
									? 'Ocultar contraseña'
									: 'Mostrar contraseña'}
							</span>
						</Button>
					</div>
				</div>
				<p className="text-sm text-gray-500">
					La contraseña debe contener (@, letra, número) y al menos 8 caracteres
				</p>
				<ButtonGeneral type="submit">Crear cuenta</ButtonGeneral>
			</form>
		</div>
	)
}
