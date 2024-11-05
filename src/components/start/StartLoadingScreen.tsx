import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { LogoAnimated } from '../shared/LogoAnimated'

export const StartLoadingScreen = ({
	onLoadingComplete,
}: {
	onLoadingComplete: () => void
}) => {
	const [progress, setProgress] = useState(0)
	const [isComplete, setIsComplete] = useState(false)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					// setTimeout(() => {
					setIsComplete(true)
					// }, 500) // Wait a bit after reaching 100%
					return 100
				}
				return prev + 1
			})
		}, 20)

		return () => clearInterval(interval)
	}, [])

	return (
		<AnimatePresence onExitComplete={onLoadingComplete}>
			{!isComplete && (
				<motion.div
					// className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-picker-2"
					className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white dark:from-black to-picker-2 dark:to-picker-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ ease: 'easeInOut', duration: 0.5 }}
				>
					<div className="relative mb-16">
						<motion.div
							className="absolute inset-0 rounded-full"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [0.5, 0.8, 0.5],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>
						<LogoAnimated />
					</div>

					{/* Progress Bar Container */}
					<div className="w-64 h-1.5 bg-slate-700/20 rounded-full overflow-hidden backdrop-blur-sm">
						<motion.div
							className="h-full bg-gradient-to-r from-picker-4 via-picker-3 to-picker-4 rounded-full"
							initial={{ width: 0 }}
							animate={{ width: `${progress}%` }}
							transition={{ duration: 0.1 }}
						/>
					</div>

					{/* Percentage Text */}
					<motion.div
						className="mt-4 text-xl font-semibold text-picker-4 dark:text-slate-200"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<span className="font-mono">{progress}%</span>
					</motion.div>

					{/* Loading Text */}
					<motion.div
						className="mt-2 text-sm text-picker-4 dark:text-slate-400"
						animate={{
							opacity: [1, 0.5, 1],
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					>
						{progress === 100 ? 'Completado' : 'Cargando...'}
					</motion.div>

					{/* Decorative Elements */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						{[...Array(20)].map((_, i) => (
							<motion.div
								key={i}
								className="absolute w-1 h-1 bg-picker-4/30 rounded-full"
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
								}}
								animate={{
									scale: [0, 1, 0],
									opacity: [0, 1, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									delay: Math.random() * 2,
									ease: 'easeInOut',
								}}
							/>
						))}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
