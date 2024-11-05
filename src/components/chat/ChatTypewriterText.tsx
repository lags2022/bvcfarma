import { motion } from 'framer-motion'

interface TypewriterTextProps {
	text: string
}

export function ChatTypewriterText({ text }: TypewriterTextProps) {
	return (
		<motion.h1
			className="text-xs text-current dark:text-white"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 1,
				staggerChildren: 0.1,
			}}
		>
			{text.split('').map((char, index) => (
				<motion.span
					key={index}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.2,
						delay: index * 0.05,
					}}
					className={`inline-block ${char === ' ' ? 'w-2' : ''}`}
				>
					{char}
				</motion.span>
			))}
		</motion.h1>
	)
}
