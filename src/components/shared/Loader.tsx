import { Loader } from 'lucide-react'

export const LoaderComponent = () => {
	return (
		<div className="contain flex gap-6 py-6 items-center justify-center">
			<Loader className="size-10 animate-spin text-picker-3" />
		</div>
	)
}
