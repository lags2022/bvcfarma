'use client'

import MotionNumber from 'motion-number'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Card, CardContent } from '@/components/ui/card'

export const HomeCountdownTimer = () => {
	const [timeLeft, setTimeLeft] = useState(10 * 60 * 60) // 10 hours in seconds

	useEffect(() => {
		if (timeLeft <= 0) return

		const intervalId = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1)
		}, 1000)

		return () => clearInterval(intervalId)
	}, [timeLeft])

	const hours = Math.floor(timeLeft / 3600)
	const minutes = Math.floor((timeLeft % 3600) / 60)
	const seconds = timeLeft % 60

	return (
		<div className="contain mx-auto relative cursor-pointer group">
			<div className='w-full group-hover:active:scale-[98%] group-hover:scale-[101%] transition-transform duration-500 ease-in-out rounded-md'>
				<Image
					src="https://images.ctfassets.net/buvy887680uc/5gPN27E87t8aoHdkorGOGb/fa8582d77e446c7fcf5b114bc3d24df9/Nosotras-CuidadoPersonal-mifarma-bx1-por-horas-web.jpg"
					alt="oferta 4"
					width={1280}
					height={165}
					className="aspect-[1280/165] size-full hidden md:block object-cover rounded-md"
				/>
				<Image
					src="https://images.ctfassets.net/buvy887680uc/2jVjFKFD1SaSkvfDM85rID/ee1c238465ede1b48b174773d17e2994/babysec-cuidadoinfantil-mifarma-bx1-por-horas-mob__2_.jpg"
					alt="oferta 4"
					width={600}
					height={304}
					className="aspect-[2/1] size-full block md:hidden object-cover rounded-md"
				/>
			</div>

			<Card className="bg-transparent border-none border-0 shadow-none absolute top-2 xs:top-6 sm:top-10 md:top-0 right-8 xs:right-10 lg:right-20 xl:right-28 flex items items-start md:items-center justify-center h-full">
				<CardContent className="p-0 flex items-end">
					<TimeUnit
						value={hours}
						label="Horas"
						color="bg-picker-5 text-white"
					/>
					<span className="text-3xl font-black mb-8 z-0">:</span>
					<TimeUnit
						value={minutes}
						label="Minutos"
						color="bg-picker-5 text-white"
					/>
					<span className="text-3xl font-black mb-8 z-0">:</span>
					<TimeUnit
						value={seconds}
						label="Segundos"
						color="bg-picker-5 text-white"
					/>
				</CardContent>
			</Card>
		</div>
	)
}

function TimeUnit({
	value,
	label,
	color,
}: {
	value: number
	label: string
	color: string
}) {
	const formatNumber = (num: number) => num.toString().padStart(2, '0')

	return (
		<div className="flex flex-col items-center z-0">
			<div className={`${color} p-2 rounded-lg shadow-md`}>
				<div className="text-2xl xs:text-3xl lg:text-4xl font-bold flex">
					<MotionNumber
						className="tabular-nums w-[0.75ch] xs:w-[1ch]"
						value={formatNumber(value)[0]}
					/>
					<MotionNumber
						className="tabular-nums w-[0.75ch] xs:w-[1ch]"
						value={formatNumber(value)[1]}
					/>
				</div>
			</div>
			<span className="mt-0 lg:mt-2 text-xs xs:text-sm font-medium">{label}</span>
		</div>
	)
}
