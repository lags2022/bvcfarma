'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthLogin } from '@/components/auth/AuthLogin'
import { AuthRegister } from '@/components/auth/AuthRegister'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFirstSearchParam } from '@/helpers/getSearchParams'
import { smoothScrollToTop } from '@/helpers/smooth-scroll-top'

export default function LoginPage() {
	const [activeTab, setActiveTab] = useState('login') // El valor por defecto es 'login'
	const searchParams = useSearchParams()
	const params = getFirstSearchParam(searchParams)

	useEffect(() => {
		const cancelScrollAnimation = smoothScrollToTop() // Inicia la animación de scroll
		setActiveTab(params?.value ?? 'login')
		return () => {
			cancelScrollAnimation() // Cancela la animación al desmontar o cuando cambie params.value

			setActiveTab('login')
		}
	}, [params?.value])

	return (
		<div className="flex w-full justify-center items-center p-4 bg-gray-50">
			<Tabs
				defaultValue="login"
				value={activeTab}
				onValueChange={(val) => setActiveTab(val)} // Maneja cambios en el tab
				className="bg-white max-w-md rounded-lg shadow-lg overflow-hidden"
			>
				<TabsList className="mx-auto w-full">
					<TabsTrigger className="text-base w-1/2 font-semibold" value="login">
						Iniciar Sesión
					</TabsTrigger>
					<TabsTrigger
						className="text-base w-1/2 font-semibold"
						value="register"
					>
						Registrarse
					</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<AuthLogin />
				</TabsContent>
				<TabsContent id="register" value="register">
					<AuthRegister />
				</TabsContent>
			</Tabs>
		</div>
	)
}
