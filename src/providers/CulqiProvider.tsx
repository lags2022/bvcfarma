'use client'

import { createContext, useState, useEffect, useRef, ReactNode } from 'react'

import type { CulqiContextProps } from '@/interfaces/culqi/culqi'

export const CulqiContext = createContext<CulqiContextProps>({
	culqiLoaded: false,
})

export const baseCulqiUrl = 'https://checkout.culqi.com'
const culqiUrl = `${baseCulqiUrl}/js/v4`

interface CulqiProviderProps {
	publicKey: string
	children: ReactNode
}

export const CulqiProvider = ({
	publicKey,
	children,
}: CulqiProviderProps): JSX.Element => {
	const [culqiLoaded, setCulqiLoaded] = useState(false)
	const scriptLoaded = useRef(false)

	useEffect(() => {
		if (!publicKey) {
			throw new Error('Please pass along a publicKey prop.')
		}

		if (scriptLoaded.current) {
			return
		}

		const script = document.createElement('script')
		script.src = culqiUrl
		script.async = true

		script.onload = () => {
			if (window.Culqi) {
				window.Culqi.publicKey = publicKey
				setCulqiLoaded(true)
				scriptLoaded.current = true
			}
		}

		script.onerror = () => {
			console.error('Failed to load Culqi script.')
		}

		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
			scriptLoaded.current = false
		}
	}, [publicKey])

	return (
		<CulqiContext.Provider value={{ culqiLoaded }}>
			{children}
		</CulqiContext.Provider>
	)
}
