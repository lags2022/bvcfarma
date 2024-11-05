import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ChatTypewriterText } from './ChatTypewriterText'

export function ChatEffectText({
	setCloseButton,
}: {
	setCloseButton: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			setIsVisible(true)
			setTimeout(() => {
				setIsVisible(false)
			}, 10000) // Text stays visible for 3 seconds
		}

		// Initial delay before first appearance
		const initialTimeout = setTimeout(() => {
			toggleVisibility()
		}, 3000)

		// Set up the interval for the animation cycle
		const interval = setInterval(() => {
			toggleVisibility()
		}, 20000) // Complete cycle every 10 seconds

		return () => {
			clearTimeout(initialTimeout)
			clearInterval(interval)
		}
	}, [])

	return (
		<AnimatePresence mode="wait">
			{isVisible && (
				<>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5 }}
						className="p-3 rounded-2xl shadow-sm rounded-br-none bg-picker-4"
					>
						<ChatTypewriterText text="¡Hola! ¿Cómo puedo ayudarte hoy?" />
					</motion.div>
					<X
						onClick={() => setCloseButton(true)}
						className="absolute size-4 p-0.5 z-20 -top-2 -left-2 rounded-full cursor-pointer bg-red-500 text-white"
					/>
				</>
			)}
		</AnimatePresence>
	)
}
