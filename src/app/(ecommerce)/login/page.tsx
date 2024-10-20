'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthLogin } from '@/components/auth/AuthLogin'
import { AuthRegister } from '@/components/auth/AuthRegister'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LOGIN_GIRL, LOGO_NAME } from '@/constants/general'
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
		<div className="flex w-full justify-center items-start p-4 py-8 bg-gray-100">
			<div className="flex rounded-lg justify-center items-start gap-6 bg-white">
				<div className="shadow-lg rounded-l-lg overflow-hidden hidden w-1/2 lg:block">
					<Image
						src={LOGIN_GIRL}
						alt="Logo"
						width={1024}
						height={1024}
						className="aspect-square size-[550px] object-cover"
					/>
				</div>
				<Tabs
					defaultValue="login"
					value={activeTab}
					onValueChange={(val) => setActiveTab(val)} // Maneja cambios en el tab
					className="max-w-lg w-auto lg:w-1/2 py-4 px-6 flex flex-col justify-center items-center"
				>
					<Link className="sm:!ml-0 my-8" href="/">
						<Image
							src={LOGO_NAME}
							alt="Logo Bvcfarma"
							width={150}
							height={50}
							className="max-w-none aspect-[143.5/40] w-auto h-11 object-contain"
						/>
					</Link>

					<TabsList className="w-full p-0 m-0">
						<TabsTrigger className="text-lg w-1/2 font-bold" value="login">
							Iniciar Sesión
						</TabsTrigger>
						<TabsTrigger className="text-lg w-1/2 font-bold" value="register">
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
		</div>
	)
}
