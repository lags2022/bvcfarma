import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { ChatGirl } from '../svg/Icons'

interface ChatMessageProps {
	message: {
		id: string
		text: string | ReactNode
		isBot: boolean
		timestamp: Date
	}
	userImage?: string | null
}

export function ChatMessage({ message, userImage }: ChatMessageProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={`flex gap-3 mb-4 ${!message.isBot && 'flex-row-reverse'}`}
		>
			<div
				className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
        ${message.isBot ? 'bg-picker-4' : 'bg-picker-5'}
        ${userImage && !message.isBot && 'bg-transparent'}
        `}
			>
				{message.isBot ? (
					<ChatGirl className="text-white size-7" />
				) : userImage ? (
					<Image
						src={userImage}
						alt="User Image"
						width={16}
						height={16}
						className="rounded-full size-full"
						unoptimized
					/>
				) : (
					<User className="text-white" size={16} />
				)}
			</div>
			<div
				className={`p-3 rounded-2xl shadow-sm max-w-[80%] sm:max-w-[70%]
        ${message.isBot ? 'rounded-tl-none bg-picker-1 dark:bg-picker-4' : 'rounded-tr-none bg-picker-5'}`}
			>
				<div
					className={cn(
						'text-gray-700 text-sm dark:text-white',
						!message.isBot && 'text-white',
					)}
				>
					{message.text}
				</div>
				<span className="text-xs text-gray-400 mt-1 block">
					{message.timestamp.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</span>
			</div>
		</motion.div>
	)
}
