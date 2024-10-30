'use client'

import { useState } from 'react'
import DatePicker from 'react-datepicker'

export const DataPickerShared = () => {
	const [startDate, setStartDate] = useState<Date>(new Date())

	return (
		// no quitar el div sino se rompe el componente
		<div>
			<DatePicker
				className="cursor-pointer text-sm text-right w-32 focus:outline-none border rounded-md p-2" // Cambia el ancho según sea necesario
				selected={startDate}
				onChange={(date) => date && setStartDate(date)}
				dateFormat="MMMM yyyy"
				showMonthYearPicker
				onFocus={(e) => e.target.blur()} // Previene que se edite al hacer foco en el campo
				popperPlacement="bottom-end" // Coloca el tooltip abajo a la derecha
				popperClassName="custom-tooltip" // Clase personalizada para el estilo
			/>
		</div>
	)
}
