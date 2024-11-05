import { motion } from 'framer-motion'
import Image from 'next/image'

import { LOGO_NAME } from '@/constants/general'

export function LogoAnimated() {
	return (
		<motion.div
			initial={{ y: -20 }}
			animate={{
				y: [0, -10, 0],
			}}
			transition={{
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut',
			}}
		>
			<div className="relative w-64 h-64 flex items-center justify-center">
				{/* Pulsing rings */}
				{[1, 2, 3].map((index) => (
					<motion.div
						key={index}
						className="absolute w-full h-full rounded-full border-2 border-picker-4 dark:border-picker-3"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: [0, 0.2, 0],
							scale: [0.8, 1.2, 1.4],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							delay: index * 0.8,
							ease: 'easeOut',
						}}
					/>
				))}

				{/* Main logo with subtle pulse */}
				<motion.div
					className="relative z-10"
					animate={{
						filter: [
							'drop-shadow(0 0 8px rgba(9,150,206,0.3))',
							'drop-shadow(0 0 16px rgba(9,150,206,0.6))',
							'drop-shadow(0 0 8px rgba(9,150,206,0.3))',
						],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				>
					<Image
						src={LOGO_NAME}
						alt="Logo"
						width={946}
						height={264}
						className="aspect-[946/264] w-64 h-18 filter drop-shadow-[0_0_8px_rgba(9,150,206,0.5)]"
					/>
				</motion.div>
			</div>
		</motion.div>
	)
}
