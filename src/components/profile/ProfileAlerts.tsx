import { LoaderCircle } from 'lucide-react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export const ProfileAlerts = ({
	handleDeleteUser,
	isSubmitting,
	isDeleting,
	showDeleteDialog,
	setShowDeleteDialog,
}: {
	handleDeleteUser: () => void
	isSubmitting: boolean
	isDeleting: boolean
	showDeleteDialog: boolean
	setShowDeleteDialog: (open: boolean) => void
}) => {
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
			<AlertDialog
				open={showDeleteDialog || isDeleting}
				onOpenChange={(open) => !isDeleting && setShowDeleteDialog(open)}
			>
				<AlertDialogTrigger asChild>
					<Button
						variant="destructive"
						className="w-full focus-visible:ring-red-500 focus-visible:ring-offset-red-500 sm:w-auto"
						disabled={isSubmitting || isDeleting}
						onClick={() => setShowDeleteDialog(true)}
					>
						Borrar cuenta
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{isDeleting
								? 'Borrando cuenta...'
								: '¿Estás seguro de que quieres borrar tu cuenta?'}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{isDeleting
								? 'Por favor, espera mientras eliminamos tu cuenta y todos los datos asociados.'
								: 'Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos los datos asociados a ella.'}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isSubmitting || isDeleting}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
							onClick={handleDeleteUser}
							disabled={isDeleting}
						>
							{isDeleting ? (
								<>
									<LoaderCircle className="animate-spin mr-2" />
									Borrando...
								</>
							) : (
								'Borrar cuenta'
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
