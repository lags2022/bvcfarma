import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

export const AuthTestOwner = ({
	isOwner,
	handleToggle,
	isPending,
}: {
	isOwner: boolean
	handleToggle: () => void
	isPending: boolean
}) => {
	return (
		<div className="flex items-center space-x-2">
			<RadioGroup
				defaultValue="user"
				className="flex items-center space-x-2"
				disabled={isPending}
			>
				<div className="flex items-center space-x-2">
					<RadioGroupItem
						value="owner"
						id="owner"
						checked={isOwner}
						onClick={handleToggle}
						disabled={isPending}
					/>
					<Label
						className={cn(isPending && 'cursor-not-allowed text-gray-400')}
						htmlFor="owner"
					>
						Ingresa como propietario
					</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
