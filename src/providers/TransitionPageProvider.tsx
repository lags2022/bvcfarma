'use client'

import { animate, AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { TransitionRouter } from 'next-transition-router'
import { useRef, useState } from 'react'

import { LogoAnimated } from '@/components/shared/LogoAnimated'
import { LOGO_NAME } from '@/constants/general'

export function TransitionPageProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const wrapperRef = useRef<HTMLDivElement>(null!)
	const [show, setShow] = useState(false)

	return (
		<TransitionRouter
			auto
			leave={(next) => {
				setShow(true)

				animate(
					wrapperRef.current,
					{ opacity: [1, 0] },
					{ duration: 0.5, onComplete: next },
				)
			}}
			enter={(next) => {
				setShow(false)

				animate(
					wrapperRef.current,
					{ opacity: [0, 1] },
					{ duration: 0.5, onComplete: next },
				)
			}}
		>
			<AnimatePresence mode="wait">
				{show && (
					<motion.div
						className="fixed inset-0 mt-16 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<LogoAnimated />
					</motion.div>
				)}
			</AnimatePresence>

			<div ref={wrapperRef}>{children}</div>
		</TransitionRouter>
	)
}
