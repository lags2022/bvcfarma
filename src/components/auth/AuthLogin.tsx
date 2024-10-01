'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

import { loginAction } from '@/actions/auth-action'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { useLastRouteStore } from '@/context/useLastRouteStore'

export const AuthLogin = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [isPending, startTransition] = useTransition()
	// const { lastRoute, setLastRoute } = useLastRouteStore(
	// 	useShallow((state) => ({
	// 		lastRoute: state.lastRoute,
	// 		setLastRoute: state.setLastRoute,
	// 	})),
	// )

	const handleSubmit = (formData: FormData) => {
		if (!formData.get('email') && !formData.get('password')) return

		startTransition(async () => {
			try {
				await loginAction({ formData })
				toast.success('Inicio de sesión exitoso')
			} catch (error) {
				console.log(`Error al iniciar sesión: ${error}`)
				toast.error('Error al iniciar sesión')
			}
		})

		// toast.promise(result, {
		// 	loading: 'Iniciando sesión...',
		// 	success: 'Inicio de sesión exitoso',
		// 	error: 'Error al iniciar sesión',
		// })

		// para que la redireccion del estado global despues de ejecutarse sea por el de defecto
		// setLastRoute('/')
	}

	return (
		<div className="p-4 sm:p-6 !pt-4 text-sm">
			{/* <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2> */}
			<p className="text-gray-600 mb-6">
				Por favor, inicia sesión usando los detalles de la cuenta a
				continuación.
			</p>
			<form action={handleSubmit} className="space-y-4">
				<div>
					{/* <Label htmlFor="email">Dirección de correo electrónico</Label> */}
					<Input
						name="email"
						type="email"
						placeholder="Dirección de correo electrónico"
						className="focus-visible:ring-picker-3"
						disabled={isPending}
					/>
				</div>
				<div>
					{/* <Label htmlFor="password">Contraseña</Label> */}
					<div className="relative">
						<Input
							name="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Contraseña"
							className="focus-visible:ring-picker-3"
							disabled={isPending}
						/>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
							onClick={() => setShowPassword(!showPassword)}
							disabled={isPending}
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
				</div>
				<a href="#" className="text-picker-3 hover:underline">
					¿Olvidaste tu contraseña?
				</a>
				<ButtonGeneral type="submit" disabled={isPending}>
					Iniciar sesión
				</ButtonGeneral>
			</form>
		</div>
	)
}
