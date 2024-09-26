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
		<div className="max-w-7xl mx-auto relative cursor-pointer px-4 group">
			<div className="w-full absolute">
				<Image
					src="https://images.ctfassets.net/buvy887680uc/5gPN27E87t8aoHdkorGOGb/fa8582d77e446c7fcf5b114bc3d24df9/Nosotras-CuidadoPersonal-mifarma-bx1-por-horas-web.jpg"
					alt="oferta 4"
					width={1280}
					height={165}
					className="aspect-[1280/165] px-10 mx-auto group-hover:active:scale-95 group-hover:scale-[102%] transition-transform duration-500 ease-in-out"
				/>
			</div>

			<Card className="mx-auto bg-transparent border-none border-0 shadow-none">
				<CardContent className="flex justify-end items-center py-6 pt-10 pr-20">
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
				<div className="text-4xl font-bold flex">
					<MotionNumber
						className="tabular-nums w-[1ch]"
						value={formatNumber(value)[0]}
					/>
					<MotionNumber
						className="tabular-nums w-[1ch]"
						value={formatNumber(value)[1]}
					/>
				</div>
			</div>
			<span className="mt-2 text-sm font-medium">{label}</span>
		</div>
	)
}
