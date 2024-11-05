'use client'

import { TriangleDownIcon } from '@radix-ui/react-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, MessageSquare } from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import { ChatSectionTabChatAI } from './ChatSectionTabChatAI'
import { ChatSectionTabHome } from './ChatSectionTabHome'
import { ChatGirl } from '../svg/Icons'
import { ChatEffectText } from './ChatEffectText'

export function ChatAssistant({
	userName,
	userImage,
}: {
	userName?: string | null
	userImage?: string | null
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState<'home' | 'chat'>('home')
	const [closeButton, setCloseButton] = useState(false)

	return (
		<div className="fixed right-0 bottom-4 sm:right-4 flex flex-col items-end z-50 w-full px-4 sm:px-0 sm:w-[380px] max-h-dvh pt-8 text-sm">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: 20 }}
						transition={{ type: 'spring', damping: 20, stiffness: 300 }}
						className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative"
					>
						{/* Header */}
						<div className="bg-picker-4 dark:bg-picker-3 p-4 flex items-center justify-between">
							<div className="flex items-center gap-2">
								{activeTab === 'home' ? (
									<Home className="text-white" size={24} />
								) : (
									<MessageSquare className="text-white" size={24} />
								)}
								<h2 className="text-white font-semibold">
									{activeTab === 'home' ? 'Home' : 'Chat AI'}
								</h2>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="text-white hover:bg-picker-5 dark:hover:bg-picker-4 p-1 rounded-full transition-colors"
							>
								<X size={20} />
							</button>
						</div>

						{/* Content Area */}
						<div className="h-[60vh] bg-gray-50 dark:bg-gray-900 pb-[58px]">
							<AnimatePresence mode="wait">
								{activeTab === 'home' ? (
									<ChatSectionTabHome
										key="home"
										userName={userName}
										onNavigateToChat={() => setActiveTab('chat')}
									/>
								) : (
									<ChatSectionTabChatAI key="chat" userImage={userImage} />
								)}
							</AnimatePresence>
						</div>

						{/* Navigation Tabs */}
						<div className=" grid grid-cols-2 border-t absolute bottom-0 left-0 right-0">
							<ButtonTabs
								tabKey="home"
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								icon={Home}
								titleTab="Home"
							/>
							<ButtonTabs
								tabKey="chat"
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								icon={MessageSquare}
								titleTab="Chat AI"
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex">
				{isOpen || closeButton || (
					<div className="relative translate-x-5 -translate-y-4 z-0">
						<ChatEffectText setCloseButton={setCloseButton} />
					</div>
				)}
				{/* Toggle Button */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						'bg-picker-4 text-white p-1 rounded-full shadow-lg hover:bg-picker-3 transition-colors m-2 sm:m-4',
						isOpen && 'p-4',
					)}
				>
					{isOpen ? (
						<TriangleDownIcon className="size-6" />
					) : (
						<ChatGirl className="size-12" />
					)}
				</motion.button>
			</div>
		</div>
	)
}

function ButtonTabs({
	tabKey,
	activeTab,
	setActiveTab,
	icon: Icon,
	titleTab,
}: {
	tabKey: 'home' | 'chat'
	activeTab: 'home' | 'chat'
	setActiveTab: (tab: 'home' | 'chat') => void
	icon: any
	titleTab: string
}) {
	return (
		<button
			onClick={() => setActiveTab(tabKey)}
			className={`p-4 flex items-center justify-center gap-2 transition-colors
      ${
				activeTab === tabKey
					? 'bg-picker-1 dark:bg-picker-3 dark:hover:bg-picker-4 text-picker-4 dark:text-white border-t-2 border-picker-4 dark:border-black'
					: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white'
			}`}
		>
			<Icon size={20} />
			<span className="font-medium">{titleTab}</span>
		</button>
	)
}
