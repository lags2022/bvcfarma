'use server'

import { openai } from '@ai-sdk/openai'
import { CoreMessage } from 'ai'
import { streamUI } from 'ai/rsc'

const messages: CoreMessage[] = []

export async function generateTextStreaming(prompt: string) {
	try {
		messages.push({
			role: 'system',
			content:
				'Eres un asistente de inteligencia artificial especializado en el ámbito de la salud y farmacia para Bvcfarma, la tienda en línea farmacéutica de Trujillo, Perú. Tu misión es brindar respuestas confiables, informativas y personalizadas sobre productos y temas de salud, ayudando a los usuarios a tomar decisiones informadas al comprar medicamentos, suplementos, equipos médicos, productos de cuidado personal y de bienestar general. Proporcionas orientación con base en normativas de salud peruanas, pero mantienes una visión global, considerando tendencias y recomendaciones internacionales.',
		})
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
