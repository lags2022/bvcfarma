'use client'

import { User, UserAddress } from '@prisma/client'
import { useState } from 'react'

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AVATAR_FALLBACK } from '@/constants/general'

export const Profile = ({
	user,
}: {
	user: User & {
		address: UserAddress
	}
}) => {
	const [avatar, setAvatar] = useState(AVATAR_FALLBACK)

	const handleAvatarChange = (e: any) => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setAvatar(reader.result as string)
			}
			reader.readAsDataURL(file)
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
					<form className="space-y-8">
						<div className="flex flex-col sm:flex-row items-center gap-4">
							<Avatar className="w-24 h-24">
								<AvatarImage src={avatar} alt="Avatar" />
								<AvatarFallback>UN</AvatarFallback>
							</Avatar>
							<div>
								<Label
									htmlFor="avatar"
									className="cursor-pointer inline-flex items-center px-4 py-2 text-primary-foreground rounded-md bg-picker-3 hover:bg-picker-4"
								>
									Cambiar foto
								</Label>
								<Input
									id="avatar"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleAvatarChange}
								/>
							</div>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="username">Nombre de usuario</Label>
								<Input id="username" placeholder="johndoe" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Correo electrónico</Label>
								<Input id="email" type="email" placeholder="john@example.com" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="firstName">Nombre</Label>
								<Input id="firstName" placeholder="John" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Apellido</Label>
								<Input id="lastName" placeholder="Doe" />
							</div>
							<div className="space-y-2 sm:col-span-2">
								<Label htmlFor="address">Dirección</Label>
								<Textarea
									id="address"
									placeholder="123 Calle Principal, Ciudad, País"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Nueva contraseña</Label>
								<Input id="password" type="password" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									Confirmar nueva contraseña
								</Label>
								<Input id="confirmPassword" type="password" />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
					<Button className="w-full sm:w-auto bg-picker-3 hover:bg-picker-4">Guardar cambios</Button>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" className="w-full focus-visible:ring-red-500 focus-visible:ring-offset-red-500 sm:w-auto">
								Borrar cuenta
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									¿Estás seguro de que quieres borrar tu cuenta?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Esta acción no se puede deshacer. Esto eliminará
									permanentemente tu cuenta y todos los datos asociados a ella.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancelar</AlertDialogCancel>
								<AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
									Borrar cuenta
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</CardFooter>
			</Card>
		</div>
	)
}
