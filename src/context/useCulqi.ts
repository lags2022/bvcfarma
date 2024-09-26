import { useContext, useCallback, useEffect, useState } from 'react'

import type {
	TokenV4,
	ErrorV4,
	CulqiContextProps,
	UseCulqiPropsV4,
} from '@/interfaces/culqi/culqi'
import { CulqiContext, baseCulqiUrl } from '@/providers/CulqiProvider'

export const useCheckoutCulqi = ({
	settings,
	onToken,
	onError,
	onClose,
}: UseCulqiPropsV4) => {
	const { culqiLoaded } = useContext(CulqiContext) as CulqiContextProps
	const [token, setToken] = useState<TokenV4 | null>(null)
	const [error, setError] = useState<ErrorV4 | null>(null)

	// messageEvent es para el evento de Culqi capturado por el iframe a traves de window.postMessage()
	// postMessage es una API propia del entorno web, no de React. Es una característica nativa del navegador que permite la comunicación entre ventanas, iframes, o incluso entre diferentes contextos (como un web worker y la página principal).
	const onCulqiEvent = useCallback(
		(messageEvent: MessageEvent) => {
			const { origin, data } = messageEvent

			if (origin !== baseCulqiUrl) return

			if (typeof data === 'object') {
				const { object } = data
				if (!object) return
				if (object === 'token') {
					setToken(data)
					onToken && onToken(data)
					window.Culqi?.close()
				} else if (object === 'error') {
					setError(data)
					onError && onError(data)
				} else if (object === 'closeCheckout') {
					onClose && onClose()
				}
			}
		},
		[onClose, onError, onToken, settings],
	)

	useEffect(() => {
		if (culqiLoaded) {
			// El evento 'message' es disparado cuando se recibe un mensaje enviado desde otra ventana o iframe mediante window.postMessage().
			window.addEventListener('message', onCulqiEvent, false)
		}
		return () => {
			window.removeEventListener('message', onCulqiEvent, false)
		}
	}, [culqiLoaded, onCulqiEvent])

	// requestAnimationFrame recibe una función de callback que se ejecutará antes del próximo repintado del navegador. Esto significa que el código dentro del callback se ejecutará en el siguiente "frame" de renderizado, lo cual es ideal para operaciones que deben ocurrir después de que el navegador haya actualizado la UI.
	const openCulqi = useCallback(() => {
		if (culqiLoaded && window.Culqi) {
			requestAnimationFrame(() => {
				window.Culqi?.settings(settings)
				window.Culqi?.options(settings?.options ?? {})
				window.Culqi?.open()
			})
			// Esta línea parece estar estableciendo una función vacía para window.culqi. Esto puede ser un intento de limpiar cualquier posible referencia previa a window.culqi o de evitar que window.culqi se sobrescriba accidentalmente en el futuro.
			window.culqi = () => {}
		}
	}, [culqiLoaded, settings])

	return { openCulqi, token, error }
}
