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

export const ChatGirl = ({
	height = '1em',
	fill = 'currentColor',
	focusable = 'false',
	...props
}: Omit<React.SVGProps<SVGSVGElement>, 'children'>) => (
	<svg {...props} viewBox="0 0 256 256">
		{/* <circle cx="128" cy="128" r="128" className="fill-picker-5" /> */}
		<g
			fill="none"
			strokeMiterlimit="10"
			strokeWidth="0"
			transform="matrix(2.81 0 0 2.81 1.4 10)"
		>
			<path fill="#f3aa00" d="M59.8 48.4v-30a14.8 14.8 0 1 0-29.6 0v30h29.6z" />
			<path
				fill="#f2c2b2"
				d="M55.4 45.2a4.7 4.7 0 0 1-3.9-4.6v-1.3h-13v1.3c0 2.2-1.7 4.2-4 4.6l-11 8.2V66c0 1 .9 2 2 2H32l13-3.2L58 68h6.6c1 0 1.9-1 1.9-2V53.4l-11-8.2z"
			/>
			<path
				fill="#266fb7"
				d="M33.5 32h-3.9c-.8 0-1.5-.7-1.5-1.6V24c0-.8.7-1.5 1.5-1.5h2.8c2.5 3 2.7 6.2 1.1 9.5zm24.1-9.5h2.8c.8 0 1.5.7 1.5 1.5v6.4c0 .9-.7 1.6-1.5 1.6h-4c-2-3.4-1.1-6.5 1.2-9.5z"
			/>
			<path
				fill="#facebf"
				d="M57.6 21.6 57 29a15 15 0 0 1-9.9 12.9 6 6 0 0 1-4.2 0 15 15 0 0 1-10-13l-.6-7.9c8.1-1 13.7-2.8 17-6.1a26 26 0 0 0 8.3 6.7z"
			/>
			<path
				fill="#dc6641"
				d="M36.6 24.6c.3-.4.8-.8 1.3-1a3.9 3.9 0 0 1 3.2 0c.5.2 1 .6 1.3 1-.6.1-1 0-1.6 0h-4.2zm11 0c.3-.4.8-.8 1.3-1a3.9 3.9 0 0 1 3.2 0c.5.2 1 .6 1.3 1h-4.2c-.5 0-1 .1-1.6 0zm-6.9 8.6 2.2 1c.7.2 1.4.4 2.1.4.7 0 1.4-.2 2-.4l2.3-1c-.4.8-1 1.4-1.7 2-.7.5-1.6.8-2.6.8s-1.9-.3-2.6-.8a5.2 5.2 0 0 1-1.7-2z"
			/>
			<path
				fill="#266fb7"
				d="M52.8 38.2H48a.7.7 0 1 1 0-1.4h4.7c2.6 0 4.8-2.2 4.8-4.8a.7.7 0 1 1 1.4 0c0 3.4-2.8 6.2-6.2 6.2zm8.4 8.1-5.8-1A29.8 29.8 0 0 1 45 59.8a29.8 29.8 0 0 1-10.4-14.7l-5.8 1c-3 .6-5.3 3.3-5.3 6.4v.8l6.7 6c1.2 1 1.9 2.6 1.9 4.3V68h5.4l7.5 7.5 7.5-7.5h5.4v-4.4c0-1.7.7-3.2 2-4.3l6.6-6v-.8c0-3.1-2.2-5.8-5.3-6.3z"
			/>
		</g>
	</svg>
)
