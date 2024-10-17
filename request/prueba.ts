// 1. Consultas sobre productos
// "¿Qué producto tienen para aliviar el dolor de cabeza?"
// "¿Cuál es el mejor medicamento para la fiebre?"
// "¿Qué crema hidratante recomiendan?"
// "¿Tienen analgésicos a buen precio?"
// "¿Qué puedo tomar para el dolor de muela?"
// "¿Tienen suplementos de vitamina C?"
// "¿Cuál es la mejor opción para reducir la fiebre?"
// "¿Tienen medicamentos para el dolor de espalda?"
// "¿Cuáles son los productos más vendidos para el cuidado personal?"

// 2. Consultas sobre precios
// "¿Cuál es el producto más barato para el resfriado?"
// "¿Cuánto cuesta el ibuprofeno?"
// "¿Tienen algún analgésico barato?"

// 2. Consultas sobre precios y ofertas
// "¿Cuál es el producto más barato para el resfriado?"
// "¿Tienen descuentos en acetaminofén?"
// "¿Qué productos están en oferta esta semana?"
// "¿Cuánto cuesta el ibuprofeno?"
// "¿Tienen algún analgésico en superOferta?"
// "¿Qué marcas ofrecen descuentos en cremas?"
// 3. Consultas sobre categorías y marcas
// "¿Qué productos tienen en la categoría de medicamentos?"
// "¿Qué suplementos de la marca Cisco Systems recomiendan?"
// "¿Tienen vitaminas de la marca Oracle?"
// "¿Cuáles son las mejores marcas de analgésicos?"
// "¿Qué marcas tienen productos para el cuidado de la piel?"
// 4. Consultas sobre stock y disponibilidad
// "¿Tienen acetaminofén en stock?"
// "¿Cuántos productos quedan de la crema hidratante?"
// "¿Tienen suficiente stock de vitamina D?"
// "¿Puedo comprar en grandes cantidades un producto para el dolor?"
// 5. Consultas sobre detalles de productos
// "¿Cuáles son los ingredientes del acetaminofén?"
// "¿Cuánto dura la oferta de este analgésico?"
// "¿El acetaminofén tiene alguna contraindicación?"
// "¿Puedo tomar ibuprofeno si estoy embarazada?"
// 6. Consultas sobre envíos y pagos
// "¿Cuánto cuesta el envío?"
// "¿Hacen envíos a provincias?"
// "¿Qué métodos de pago aceptan?"
// "¿Puedo pagar con tarjeta de crédito?"
// "¿Cuáles son las opciones de envío rápido?"
// 7. Consultas sobre pedidos y favoritos
// "¿Dónde puedo ver mis productos favoritos?"
// "¿Cómo agrego productos a mi lista de deseos?"
// "¿Cómo puedo ver el estado de mi pedido?"
// "¿Puedo modificar mi pedido una vez que está en proceso?"
// 8. Consultas sobre descuentos y unidades
// "¿Puedo obtener un descuento si compro más de una unidad?"
// "¿Tienen descuentos por compras en grandes cantidades?"
// "¿Cuántas unidades puedo comprar de este producto?"
// 9. Consultas sobre uso y recomendaciones
// "¿Qué me recomiendan para el dolor de garganta?"
// "¿Qué medicamento debería tomar para el dolor muscular?"
// "¿Cuál es el mejor producto para aliviar el dolor de espalda?"
// "¿Qué crema recomiendan para piel seca?"
// 10. Consultas sobre condiciones específicas
// "Tengo fiebre y dolor de cabeza, ¿qué me recomiendan?"
// "Tengo dolor en la espalda baja, ¿qué puedo tomar?"
// "¿Qué puedo usar para aliviar los síntomas del resfriado?"
// "¿Cuál es el mejor suplemento de vitaminas para aumentar la energía?"
// 11. Consultas generales y personalizadas
// "¿Qué puedo tomar si tengo fiebre y estoy resfriado?"
// "¿Qué producto es bueno y económico para el dolor de estómago?"
// "¿Qué me recomiendan si me duele la garganta y tengo fiebre?"
// "¿Tienen algo para ayudarme a dormir mejor?"
// 12. Consultas sobre características de productos
// "¿Este producto es apto para veganos?"
// "¿Este medicamento es libre de gluten?"
// "¿Tienen versiones sin azúcar de este suplemento?"
// "¿Puedo usar esta crema si tengo piel sensible?"

type Intention = 'Consultas sobre productos' | 'Consultas sobre precios'
// | 'Consultas sobre precios y ofertas'
// | 'Consultas sobre categorías y marcas'
// | 'Consultas sobre stock y disponibilidad'
// | 'Consultas sobre detalles de productos'
// | 'Consultas sobre envíos y pagos'
// | 'Consultas sobre pedidos y favoritos'
// | 'Consultas sobre descuentos y unidades'
// | 'Consultas sobre uso y recomendaciones'
// | 'Consultas sobre condiciones específicas'
// | 'Consultas generales y personalizadas'
// | 'Consultas sobre características de productos'

type keywords = {
	type: TypeKeyword
	label: LabelKeyword
}

type TypeKeyword = 'sintomas' | 'producto' | 'precio'
// | 'descuentos' | "categoria" | 'stock' | 'disponibilidad' | 'detalles' | 'envíos' | 'pagos' | 'pedidos' | 'favoritos'

type LabelKeyword =
	| 'dolor de cabeza'
	| 'dolor de muela'
	| 'dolor muscular'
	| 'dolor en la espalda'
	| 'dolor del estómago'
	| 'general'
	| 'cremas'
	| 'ibuprofeno'
	| 'vitamina C'
	| 'suplementos'
	| 'cremas'
	| 'adultos mayores'

// const KeyWords = [
// 	// sintomas
// 	{
// 		type: 'sintomas',
// 		label: 'dolor de cabeza',
// 	},
// 	{
// 		type: 'sintomas',
// 		label: 'dolor de muela',
// 	},
// 	{
// 		type: 'sintomas',
// 		label: 'dolor muscular',
// 	},
// 	{
// 		type: 'sintomas',
// 		label: 'dolor en la espalda',
// 	},
// 	{
// 		type: 'sintomas',
// 		label: 'dolor del estómago',
// 	},

// 	//producto
// 	{
// 		type: 'producto',
// 		label: 'general', // todos
// 	},
// 	{
// 		type: 'producto',
// 		label: 'cremas',
// 	},
// 	{
// 		type: 'producto',
// 		label: 'ibuprofeno',
// 	},
// 	{
// 		type: 'producto',
// 		label: 'vitamina C',
// 	},

// 	// categoria
// 	{
// 		type: 'categoria',
// 		label: 'suplementos',
// 	},
// 	{
// 		type: 'categoria',
// 		label: 'cremas',
// 	},
// 	{
// 		type: 'categoria',
// 		label: 'adultos mayores',
// 	},
// ]

// 1. Consultas sobre productos
// "¿Qué producto tienen para aliviar el dolor de cabeza?"
// "¿Cuál es el mejor medicamento para la fiebre?"
// "¿Qué crema hidratante recomiendan?"
// "¿Tienen analgésicos a buen precio?"
// "¿Qué puedo tomar para el dolor de muela?"
// "¿Tienen suplementos de vitamina C?"
// "¿Cuál es la mejor opción para reducir la fiebre?"
// "¿Tienen medicamentos para el dolor de espalda?"
// "¿Cuáles son los productos más vendidos para el cuidado personal?"

// 2. Consultas sobre precios
// "¿Cuál es el producto más barato para el resfriado?"
// "¿Cuánto cuesta el ibuprofeno?"
// "¿Tienen algún analgésico barato?"

// {"prompt": "¿Qué puedo tomar para el dolor de cabeza?", "completion": "{\"intention\": \"Consultas sobre productos\", \"keyWords\": [{\"type\": \"sintomas\", \"label\": \"dolor de cabeza\"}]}"}

// {"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}

// const casos = [
// 	{
// 		prompt: '¿Qué puedo tomar para el dolor de cabeza?',
// 		completion: {
// 			intention: 'Consultas sobre productos',
// 			keyWords: [
// 				{
// 					type: 'sintomas',
// 					label: 'dolor de cabeza',
// 				},
// 				{
// 					type: 'producto',
// 					label: 'general',
// 				},
// 			],
// 		},
// 	},
// 	{
// 		prompt: '¿Tienen descuentos en suplementos de vitamina C?',
// 		completion: {
// 			intention: 'Consultas sobre precios',
// 			keyWords: [
// 				{
// 					type: 'precios',
// 					label: 'general',
// 				},
// 				{
// 					type: 'categoria',
// 					label: 'suplementos',
// 				},
// 				{
// 					type: 'producto',
// 					label: 'vitamina C',
// 				},
// 			],
// 		},
// 	},
// ]
[
	{
		messages: [
			{
				role: 'system',
				content:
					'Eres un asistente de farmacia online. Tu tarea es clasificar la intención del usuario y extraer palabras clave para buscar en la base de datos.',
			},
			{
				role: 'user',
				content: '¿Qué puedo tomar para el dolor de cabeza?',
			},
			{
				role: 'assistant',
				content: {
					intention: 'Consultas sobre productos',
          keyWords: [
            {
              type: 'sintomas',
              label: 'dolor de cabeza',
            },
            {
              type: 'producto',
              label: 'general',
            },
          ],
        },
			},
		],
	},
  {
    messages: [
      {
        role: 'system',
        content:
          'Eres un asistente de farmacia online. Tu tarea es clasificar la intención del usuario y extraer palabras clave para buscar en la base de datos.',
      },
      {
        role: 'user',
        content: '¿Cuál es el mejor medicamento para la fiebre?',
      },
      {
        role: 'assistant',
        content: {
          intention: 'Consultas sobre productos',
          keyWords: [
            {
              type: 'sintomas',
              label: 'fiebre',
            },
            {
              type: 'producto',
              label: 'general',
            },
          ],
        },
      }
    ],
  },
  {
    messages: [
      {
        role: 'system',
        content:
          'Eres un asistente de farmacia online. Tu tarea es clasificar la intención del usuario y extraer palabras clave para buscar en la base de datos.',
      },
      {
        role: 'user',
        content: '¿Tienen analgésicos a buen precio?',
      },
      {
        role: 'assistant',
        content: {
          intention: 'Consultas sobre productos',
          keyWords: [
            {
              type: 'precios',
              label: 'general',
            },
            {
              type: 'producto',
              label: 'analgésicos',
            },
          ],
        },
      }
    ],
  }
]
