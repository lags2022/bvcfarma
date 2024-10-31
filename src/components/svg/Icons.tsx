export const ArrowIndicatorUp = ({
	height = '1em',
	fill = 'currentColor',
	focusable = 'false',
	...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
	<svg
		{...props}
		fill="currentColor"
		stroke="currentColor"
		strokeWidth="0"
		className="me-1 h-4 w-4"
		viewBox="0 0 256 256"
	>
		<path stroke="none" d="M208 200H48l80-80Z" opacity=".2" />
		<path
			stroke="none"
			d="M134 114a8 8 0 0 0-12 0l-80 80a8 8 0 0 0 6 14h160a8 8 0 0 0 6-14Zm-67 78 61-61 61 61Zm-25-66a8 8 0 0 1 0-12l80-80a8 8 0 0 1 12 0l80 80a8 8 0 0 1-12 12l-74-75-74 75a8 8 0 0 1-12 0Z"
		/>
	</svg>
)

export const ArrowIndicatorDown = ({
	height = '1em',
	fill = 'currentColor',
	focusable = 'false',
	...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
	<svg
		fill="currentColor"
		stroke="currentColor"
		strokeWidth="0"
		className="me-1 h-4 w-4"
		viewBox="0 0 256 256"
	>
		<path stroke="none" d="m208 56-80 80-80-80Z" opacity=".2" />
		<path
			stroke="none"
			d="m214 142-80 80a8 8 0 0 1-12 0l-80-80a8 8 0 0 1 12-12l74 75 74-75a8 8 0 0 1 12 12ZM42 62a8 8 0 0 1 6-14h160a8 8 0 0 1 6 14l-80 80a8 8 0 0 1-12 0Zm25 2 61 61 61-61Z"
		/>
	</svg>
)

export const NoData = ({
	height = '1em',
	fill = 'currentColor',
	focusable = 'false',
	...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
	<svg {...props} viewBox="0 0 184 152">
		<g fill="none">
			<g transform="translate(24 32)">
				<ellipse cx="67.8" cy="106.9" fill="#F5F5F7" rx="67.8" ry="12.7" />
				<path fill="#AEB8C2" d="M122 70 98 40l-4-2H42l-5 2-23 30v15h108V70z" />
				<path
					fill="url(#linearGradient-1)"
					d="M102 86 81 61l-4-2H32l-4 2L7 86v14h95V86z"
					transform="translate(14)"
				/>
				<path
					fill="#F5F5F7"
					d="M34 0h68a4 4 0 0 1 4 4v93a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
				/>
				<path
					fill="#DCE0E6"
					d="M43 10h50a2 2 0 0 1 2 2v25a2 2 0 0 1-2 2H43a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2zm0 40h50a2 2 0 1 1 0 4H43a2 2 0 0 1 0-4zm0 12h50a2 2 0 1 1 0 4H43a2 2 0 0 1 0-4zm79 43c-1 3-4 5-7 5H21c-4 0-6-2-7-5a7 7 0 0 1 0-2V70h26c3 0 5 2 5 5s2 6 5 6h35c3 0 5-3 5-6s3-5 6-5h26v35z"
				/>
			</g>
			<path
				fill="#DCE0E6"
				d="m149 33-7 3a1 1 0 0 1-1-1l2-6c-3-3-4-7-4-11 0-10 10-18 22-18 13 0 23 8 23 18s-10 18-23 18l-12-3z"
			/>
			<g fill="#FFF" transform="translate(150 15)">
				<circle cx="20.7" cy="3.2" r="2.8" />
				<path d="M6 6H0l3-5zm3-5h5v5H9z" />
			</g>
		</g>
	</svg>
)
