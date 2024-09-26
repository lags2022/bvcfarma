import React from 'react'
/**
 * ❤️ From:
 * https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
 *
 */
export const useMousePosition = () => {
	const [mousePosition, setMousePosition] = React.useState({
		x: 0,
		y: 0,
	})
	React.useEffect(() => {
		const updateMousePosition = (ev: any) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY })
		}
		window.addEventListener('mousemove', updateMousePosition)
		return () => {
			window.removeEventListener('mousemove', updateMousePosition)
		}
	}, [])
	return mousePosition
}
