import { useState, useEffect } from 'react'

// const queries = {
//   isMobile: '(max-width: 768px)',
//   isTablet: '(min-width: 769px) and (max-width: 1024px)',
//   isDesktop: '(min-width: 1025px)',
// };

export function useMediaQuery(query: string) {
	const [value, setValue] = useState(false)

	useEffect(() => {
		function onChange(event: MediaQueryListEvent) {
			setValue(event.matches)
		}

		const result = matchMedia(query)
		result.addEventListener('change', onChange)
		setValue(result.matches)

		return () => result.removeEventListener('change', onChange)
	}, [query])

	return value
}
