import { Loader } from 'lucide-react'

export const Loading = () => {
	return (
		<div className="container flex items-center justify-center">
			<Loader className="size-14 animate-spin text-picker-3" />
		</div>
	)
}
