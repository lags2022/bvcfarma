import { Options, SettingsV4 } from './culqi'

declare global {
	interface Window {
		Culqi?: {
			publicKey: string
			open: () => void
			settings: (settings: SettingsV4) => void
			// settings: (settings: Yape) => void
			options: (options: Partial<Options>) => void
			close: () => void
		}
		culqi?: any
	}
}

export {}
