import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import { useEffect, useState } from 'react'

const text = 'Cargando...'

export const StartLoadingText = () => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setInterval(() => {
			setIsVisible((prev) => !prev)
		}, 1500)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className="flex justify-center items-center overflow-hidden">
			<AnimatePresence mode="wait">
				{isVisible && (
					<div className="flex">
						{text.split('').map((char, index) => (
							<motion.span
								key={index}
								className="font-bold text-picker-4"
								initial={{ x: 100, opacity: 0 }}
								animate={{
									x: 0,
									opacity: 1,
									transition: {
										duration: 0.3,
										delay: index * 0.1,
										ease: easeInOut,
									},
								}}
								exit={{
									x: -100,
									opacity: 0,
									transition: {
										duration: 0.3,
										delay: index * 0.1, // Changed this line to make letters exit in sequence from left to right
										ease: easeInOut,
									},
								}}
								style={{
									display: 'inline-block',
									whiteSpace: 'pre',
								}}
							>
								{char}
							</motion.span>
						))}
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}
