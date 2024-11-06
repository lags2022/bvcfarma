import { LoaderCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { deleteUser } from '@/actions/user-action'
import { Button } from '@/components/ui/button'

import { DeleteAlertDialogTrigger } from '../shared/dashboard/DeleteAlertDialogTrigger'

export const ProfileAlerts = ({
	isSubmitting,
	isDeleting,
	isPageDashboard,
	setIsDeleting,
	userId,
}: {
	isSubmitting: boolean
	isDeleting: boolean
	isPageDashboard?: boolean
	setIsDeleting: (isDeleting: boolean) => void
	userId: string
}) => {
	const pathname = usePathname()
	const phrase = pathname.startsWith('/dashboard/customers') ? 'la' : 'tu'

	return (
		<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
			<Button
				type="submit"
				className="w-full sm:w-auto bg-picker-3 hover:bg-picker-4"
				disabled={isSubmitting || isDeleting}
			>
				{isSubmitting ? (
					<>
						<LoaderCircle className="animate-spin mr-2" />
						Guardando...
					</>
				) : (
					'Guardar cambios'
				)}
			</Button>
			<DeleteAlertDialogTrigger
				isDeleting={isDeleting}
				isSubmitting={isSubmitting}
				setIsDeleting={setIsDeleting}
				actionHandler={() => deleteUser(isPageDashboard ? userId : undefined)}
				messagesArray={[
					'Cuenta eliminada',
					'No se pudo eliminar la cuenta',
					'Borrar cuenta',
					'Borrando cuenta...',
					`¿Estás seguro de que quieres borrar ${phrase} cuenta?`,
					`Por favor, espera mientras eliminamos ${phrase} cuenta y todos los datos asociados.`,
					`Esta acción no se puede deshacer. Esto eliminará permanentemente ${phrase} cuenta y todos los datos asociados a ella.`,
				]}
			/>
		</div>
	)
}
