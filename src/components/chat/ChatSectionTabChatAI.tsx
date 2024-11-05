import { motion } from 'framer-motion'
import { Send, Bot } from 'lucide-react'
import {
	useState,
	useRef,
	useEffect,
	ReactElement,
	ReactNode,
	JSXElementConstructor,
} from 'react'

import { generateTextStreaming } from '@/actions/openai'

import { ChatMessage } from './ChatMessage'

// const BOT_RESPONSES = [
// 	"I'd be happy to help you with that!",
// 	"That's an interesting question. Let me think about it...",
// 	"I understand what you're asking. Here's what I think...",
// 	"Thanks for sharing! Here's my perspective...",
// 	'I can definitely assist you with that request.',
// ]
interface MessageState {
	id: string
	text: string | ReactNode
	isBot: boolean
	timestamp: Date
}

export function ChatSectionTabChatAI({
	userImage,
}: {
	userImage?: string | null
}) {
	const [isTyping, setIsTyping] = useState(false)
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState<MessageState[]>([
		{
			id: '1',
			text: 'Hola! ¿Cómo puedo ayudarte hoy?',
			isBot: true,
			timestamp: new Date(),
		},
	])

	const chatContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
		}
	}, [messages])

	const simulateBotResponse = async (message: string) => {
		setIsTyping(true)

		const responseMessageOpenai = await generateTextStreaming(message)

		setMessages((prev) => [
			...prev,
			{
				id: Date.now().toString(),
				text: responseMessageOpenai.ui,
				isBot: true,
				timestamp: new Date(),
			},
		])

		setIsTyping(false)

		// para simular la respuesta del bot
		// setTimeout(() => {
		// 	const randomResponse =
		// 		BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)]

		// 	setMessages((prev) => [
		// 		...prev,
		// 		{
		// 			id: Date.now().toString(),
		// 			text: randomResponse,
		// 			isBot: true,
		// 			timestamp: new Date(),
		// 		},
		// 	])
		// 	setIsTyping(false)
		// }, 1500)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (message.trim()) {
			setMessages((prev) => [
				...prev,
				{
					id: Date.now().toString(),
					text: message.trim(),
					isBot: false,
					timestamp: new Date(),
				},
			])
			setMessage('')
			await simulateBotResponse(message.trim())
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			className="h-full flex flex-col text-sm"
		>
			<div
				ref={chatContainerRef}
				className="flex-1 p-4 overflow-y-auto scroll-smooth menu-categories"
			>
				{messages.map((msg) => (
					<ChatMessage userImage={userImage} key={msg.id} message={msg} />
				))}
				{isTyping && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex gap-2 items-center text-gray-500 dark:text-white text-sm"
					>
						<div className="w-8 h-8 bg-picker-4 rounded-full flex items-center justify-center">
							<Bot className="text-white" size={16} />
						</div>
						<motion.div
							animate={{
								opacity: [0.4, 1, 0.4],
								transition: { duration: 1.5, repeat: Infinity },
							}}
						>
							Typing...
						</motion.div>
					</motion.div>
				)}
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="p-4 border-t bg-white dark:bg-gray-900"
			>
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Escribe tu mensaje..."
						className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-picker-3 focus:border-transparent text-sm"
					/>
					<button
						type="submit"
						disabled={!message.trim() || isTyping}
						className="bg-picker-4 text-white p-3 rounded-full hover:bg-picker-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Send size={18} />
					</button>
				</form>
			</motion.div>
		</motion.div>
	)
}
