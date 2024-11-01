'use client'

import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Tooltip } from 'react-tooltip'

import { DataPickerShared } from '@/components/shared/dashboard/DataPickerShared'

import { DashboardWrapperItem } from '../DashboardWrapperItem'

const data = [
	{ country: 'LIMA', users: 40 },
	{ country: 'CUSCO', users: 20 },
	{ country: 'AREQUIPA', users: 15 },
	{ country: 'TACNA', users: 10 },
	{ country: 'LA LIBERTAD', users: 215 },
	{ country: 'AYACUCHO', users: 10 },
	{ country: 'HUANUCO', users: 10 },
	{ country: 'ICA', users: 11 },
	{ country: 'PUNO', users: 23 },
	{ country: 'PASCO', users: 2 },
	{ country: 'UCAYALI', users: 5 },
	{ country: 'JUNIN', users: 55 },
	{ country: 'LAMBAYEQUE', users: 5 },
	{ country: 'CALLAO', users: 35 },
	{ country: 'TUMBES', users: 5 },
	{ country: 'ANCASH', users: 15 },
	{ country: 'HUANCAVELICA', users: 5 },
	{ country: 'CAJAMARCA', users: 25 },
	{ country: 'MOQUEGUA', users: 5 },
	{ country: 'APURIMAC', users: 55 },
	{ country: 'PIURA', users: 35 },
	{ country: 'TUMBES', users: 35 },
	{ country: 'AMAZONAS', users: 15 },
	{ country: 'LORETO', users: 45 },
	{ country: 'CALLAO', users: 25 },

	// Agrega más departamentos de Perú si quieres
]

// Ruta del mapa departamental de Perú en formato GeoJSON
const geoUrl =
	'https://raw.githubusercontent.com/juaneladio/peru-geojson/refs/heads/master/peru_departamental_simple.geojson'

export const DashboardUserLocation = () => {
	const [tooltipContent, setTooltipContent] = useState('')

	const handleCountryHover = (countryName: string) => {
		const countryData = data.find((item) => item.country === countryName)
		if (countryData) {
			setTooltipContent(`${countryData.country}: ${countryData.users} usuarios`)
		} else {
			setTooltipContent(`${countryName}: Sin datos`)
		}
	}

	const handleCountryLeave = () => {
		setTooltipContent('')
	}

	return (
		<DashboardWrapperItem>
			<div className="flex flex-col gap-3 justify-between items-center h-full">
				<div className="flex justify-between w-full">
					<div>
						<h4>Ubicación de Usuarios</h4>
						<p>Enero - Junio 2024</p>
					</div>
					<DataPickerShared />
				</div>
				<ComposableMap
					projection="geoMercator"
					projectionConfig={{
						scale: 1800, // Ajusta el zoom (puedes experimentar con este valor)
						center: [-75.0152, -9.1899], // Centra el mapa en Perú
					}}
          className='aspect-auto w-full h-[300px] sm:h-[350px]'
				>
					<Geographies geography={geoUrl}>
						{({ geographies }) =>
							geographies.map((geo) => {
								const countryName = geo.properties.NOMBDEP

								return (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onMouseEnter={() => handleCountryHover(countryName)}
										onMouseLeave={handleCountryLeave}
										style={{
											default: { outline: 'none' },
											hover: { outline: 'none' },
											pressed: { outline: 'none' },
										}}
										className="cursor-pointer fill-picker-1 hover:fill-picker-3 active:fill-picker-4 dark:fill-picker-3 dark:hover:fill-picker-5 dark:active:fill-picker-4 stroke-picker-5 dark:stroke-picker-1"
										data-tooltip-id="my-tooltip"
										data-tooltip-content={tooltipContent}
									/>
								)
							})
						}
					</Geographies>
				</ComposableMap>
				<Tooltip id="my-tooltip" />

				{/* Leyenda */}
				<div className="flex space-x-4 items-center mt-4 text-xs">
					<div className="flex items-center space-x-2">
						<span className="w-2 h-2 rounded-[2px] bg-pink-500 inline-block"></span>
						<span className="dark:text-white font-medium">Móvil</span>
					</div>
					<div className="flex items-center space-x-2">
						<span className="w-2 h-2 bg-green-500 rounded-[2px] inline-block"></span>
						<span className="dark:text-white font-medium">Escritorio</span>
					</div>
				</div>
			</div>
		</DashboardWrapperItem>
	)
}
