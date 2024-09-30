'use client'

import { ErrorCustom } from '@/components/error/ErrorCustom'

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return <ErrorCustom error={error} reset={reset} />
}
