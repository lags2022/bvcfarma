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
