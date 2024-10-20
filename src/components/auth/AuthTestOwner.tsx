import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const AuthTestOwner = ({
	isOwner,
	handleToggle,
}: {
	isOwner: boolean
	handleToggle: () => void
}) => {
	return (
		<div className="flex items-center space-x-2">
			<RadioGroup defaultValue="user" className="flex items-center space-x-2">
				<div className="flex items-center space-x-2">
					<RadioGroupItem
						value="owner"
						id="owner"
						checked={isOwner}
						onClick={handleToggle}
					/>
					<Label htmlFor="owner">Ingresa como propietario</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
