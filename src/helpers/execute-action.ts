export async function executeAction<U>(action: () => Promise<U>): Promise<U> {
	try {
		return await action()
	} catch (error) {
		console.error('Error in Model operation:', error)
		throw error
	}
}
