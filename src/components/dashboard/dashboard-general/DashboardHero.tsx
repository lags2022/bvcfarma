import { Plus } from 'lucide-react'
import Image from 'next/image'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { getGretting } from '@/helpers/dashboard/get-gretting'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const DashboardHero = ({ name }: { name: string }) => {
	return (
		<DashboardWrapperItem isHero>
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
				<div className="space-y-2 sm:space-y-4">
					<h1 className="text-xl capitalize sm:text-2xl font-bold tracking-tight">
						{getGretting()}
						<br className='xl:hidden' /> {name}
						<span role="img" aria-label="waving hand">
							👋!
						</span>
					</h1>
					<p className="text-muted-foreground text-sm max-w-lg">
						Aquí tienes el resumen de lo que está ocurriendo en tu tienda hoy.
					</p>
					<ButtonGeneral className="!mt-3 gap-1 w-auto">
						<Plus size={16} />
						Añadir producto
					</ButtonGeneral>
				</div>
				<div className="hidden sm:block">
					<Image
						src="https://res.cloudinary.com/dvozbuwkx/image/upload/v1730166546/shop-illustration_i9qh9j.webp"
						width={2000}
						height={2000}
						alt="Store illustration"
						className="aspect-square w-52 md:w-64"
					/>
				</div>
			</div>
		</DashboardWrapperItem>
	)
}
