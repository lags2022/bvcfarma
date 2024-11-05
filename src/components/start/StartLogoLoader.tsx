'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { StartLoadingScreen } from './StartLoadingScreen'

// useEffect(() => {
// 	// Show initial animation
// 	setTimeout(() => {
// 		setIsInitialLoad(false)
// 	}, 2000)
// }, [])

export function StartLogoLoader({ children }: { children: React.ReactNode }) {
	const [isInitialLoad, setIsInitialLoad] = useState(true)

	const handleLoadingComplete = () => {
		setIsInitialLoad(false)
	}

	return (
		<>
			{isInitialLoad ? (
				<StartLoadingScreen onLoadingComplete={handleLoadingComplete} />
			) : (
				children
			)}
		</>
	)
}
