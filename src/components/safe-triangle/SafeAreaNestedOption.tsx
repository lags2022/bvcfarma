'use client'

import { useCallback, useRef, useState } from 'react'

import { SafeArea } from './SafeArea'

export const SafeAreaNestedOption = () => {
	const [open, setOpen] = useState(false)
	const parent = useRef(null)
	const child = useRef(null)

	const getTop = useCallback(() => {
		const height = (child.current as any)?.offsetHeight
		return height ? `-${height / 2 - 15}px` : 0
	}, [child])

	return (
		<li
			ref={parent}
			style={{ position: 'relative' }}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			ojallllll
			{/* Safe mouse area */}
			{/* This is where the magic will happen */}
			{open && parent.current && child.current && (
				<SafeArea anchor={parent.current} submenu={child.current} />
			)}
			{/* Nested elements as children */}
			<div
				style={{
					visibility: open ? 'visible' : 'hidden',
					position: 'absolute',
					left: (parent.current as any)?.offsetWidth || 0,
					top: getTop(),
				}}
				ref={child}
			>
				<ul className="w-32">
					<li>Nested Option 1</li>
					<li>Nested Option 2</li>
					<li>Nested Option 3</li>
					<li>Nested Option 4</li>
				</ul>
			</div>
		</li>
	)
}
