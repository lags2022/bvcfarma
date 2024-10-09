'use client' // Error boundaries must be Client Components

import { notFound } from 'next/navigation'

export default function Error() {
	notFound()
}
