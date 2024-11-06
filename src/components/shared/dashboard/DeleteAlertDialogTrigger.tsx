import { LoaderCircle, Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

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

export function DeleteAlertDialogTrigger({
	// estas dos props son cuando se usan en formularios junto con otros inputs para que se puedan deshabilitar
	isDeleting,
	setIsDeleting,

  isTable,
	isSubmitting,
	actionHandler,
	messagesArray,
}: {
	isDeleting?: boolean
	setIsDeleting?: (isDeleting: boolean) => void
	isSubmitting?: boolean
	actionHandler: (userId?: string) => Promise<void>
	messagesArray: Array<string>
  isTable?: boolean
}) {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [isDeletingOther, setIsDeletingOther] = useState(false)

	const handleDeleteUser = async () => {
		setIsDeleting && setIsDeleting(true)
		setIsDeletingOther(true)
		try {
			await actionHandler()
			toast.success(messagesArray[0])
		} catch (error) {
			toast.error(messagesArray[1])
		} finally {
			setIsDeleting && setIsDeleting(false)
			setIsDeletingOther(false)
			setShowDeleteDialog(false)
		}
	}

	return (
		<AlertDialog
			open={showDeleteDialog || isDeleting || isDeletingOther}
			onOpenChange={(open) =>
				!isDeleting && !isDeletingOther && setShowDeleteDialog(open)
			}
		>
			<AlertDialogTrigger asChild>
				{!isTable ? (
					<Button
						variant="destructive"
						className="w-full focus-visible:ring-red-500 focus-visible:ring-offset-red-500 sm:w-auto"
						disabled={isSubmitting || isDeleting || isDeletingOther}
						onClick={() => setShowDeleteDialog(true)}
					>
						{messagesArray[2]}
					</Button>
				) : (
					<Trash2 className="size-4 transition-colors ease duration-300 group-hover:text-white" />
				)}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{isDeleting || isDeletingOther
							? messagesArray[3]
							: messagesArray[4]}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{isDeleting || isDeletingOther
							? messagesArray[5]
							: messagesArray[6]}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						disabled={isSubmitting || isDeleting || isDeletingOther}
					>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						onClick={handleDeleteUser}
						disabled={isDeleting || isDeletingOther}
					>
						{isDeleting || isDeletingOther ? (
							<>
								<LoaderCircle className="animate-spin mr-2" />
								Borrando...
							</>
						) : (
							messagesArray[2]
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
