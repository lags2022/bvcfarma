export const fetchUrl = async ({
	url,
	method = 'GET',
	body,
	headersOptions,
	typeFetching,
}: {
	url: string
	method?: 'GET' | 'POST'
	body?: any
	headersOptions?: any
	typeFetching?: 'checkout'
}) => {
	try {
		let response: Response

		if (method === 'POST') {
			response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...headersOptions,
				},
				body: JSON.stringify(body),
        // cache: 'no-store',
			})

			// esto si se requiere autenticación 3DS
			// if (typeFetching === 'checkout' && response.status !== 201)
			// 	throw new Error('El usuario necesita autenticarse 3DS')
		} else {
			response = await fetch(url)
		}

		return response.json()
	} catch (error) {
		console.error(error)
		throw new Error('Something went wrong')
	}
}
