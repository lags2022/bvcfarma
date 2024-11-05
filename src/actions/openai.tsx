'use server'

import { openai } from '@ai-sdk/openai'
import { CoreMessage } from 'ai'
import { streamUI } from 'ai/rsc'

const messages: CoreMessage[] = []

export async function generateTextStreaming(prompt: string) {
	try {
		messages.push({ role: 'user', content: prompt })

		const stream = await streamUI({
			model: openai('gpt-4o-mini'),
			messages,
			text: async ({ content }) => {
				return <div>{content}</div>
			},
		})

		return {
			ui: stream.value,
		}
	} catch (error) {
		throw new Error(`Error generating text with OpenAI: ${error}`)
	}
}
