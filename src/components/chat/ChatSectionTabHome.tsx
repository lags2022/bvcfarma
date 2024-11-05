import { motion } from 'framer-motion'
import { MessageSquare, Phone } from 'lucide-react'

import { URL_WHATSAPP } from '@/constants/general'

interface HomeTabProps {
	onNavigateToChat: () => void
	userName?: string | null
}

export function ChatSectionTabHome({
	onNavigateToChat,
	userName,
}: HomeTabProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20 }}
			className="h-full p-6"
		>
			<div className="mb-8">
				<h2 className="text-lg font-bold text-gray-800 dark:text-white">Hola {userName} 👋</h2>
				<p className="text-gray-600 mt-2 dark:text-white">¿Cómo podemos ayudarte hoy?</p>
			</div>

			<div className="grid gap-4">
				<motion.a
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="bg-white dark:bg-green-950 p-4 rounded-xl shadow-sm cursor-pointer border border-gray-100 dark:border-green-500 hover:border-green-200 transition-colors"
					href={URL_WHATSAPP}
					target="_blank"
					rel="noopener noreferrer"
				>
					<div className="flex items-center gap-3">
						<div className="bg-green-100 p-2 rounded-lg">
							<Phone className="text-green-600" size={24} />
						</div>
						<div>
							<h3 className="font-semibold text-gray-800 dark:text-white">WhatsApp</h3>
							<p className="text-sm text-gray-500 dark:text-white">
								Contacta con nosotros vía WhatsApp
							</p>
						</div>
					</div>
				</motion.a>

				<motion.div
					onClick={onNavigateToChat}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm cursor-pointer border border-picker-1 dark:border-slate-500 hover:border-picker-2 transition-colors"
				>
					<div className="flex items-center gap-3">
						<div className="bg-picker-1 p-2 rounded-lg">
							<MessageSquare className="text-picker-4" size={24} />
						</div>
						<div>
							<h3 className="font-semibold text-gray-800 dark:text-white">Chat AI</h3>
							<p className="text-sm text-gray-500 dark:text-white">
								Habla con nuestro asistente AI
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	)
}
