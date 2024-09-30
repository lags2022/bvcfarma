import { AlertTriangle, RefreshCcw, Mail } from 'lucide-react'

import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Button } from '@/components/ui/button'

export const ErrorCustom = ({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) => {
	return (
		<main className="contain flex w-full max-w-lg flex-col items-center justify-center space-y-8 text-center py-6">
			<AlertTriangle
				className="h-24 w-24 text-destructive"
				aria-hidden="true"
			/>
			<h1 className="text-4xl font-bold tracking-tight">
				¡Ups! Algo salió mal
			</h1>
			<p className="text-xl text-muted-foreground">
				Lamentamos los inconvenientes. Nuestro equipo ha sido notificado y está
				trabajando en una solución.
			</p>
			{error.digest && (
				<p className="text-sm text-muted-foreground">
					ID del error: <code className="font-mono">{error.digest}</code>
				</p>
			)}
			<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
				<ButtonGeneral
					onClick={() => reset()}
					className="flex items-center space-x-2"
				>
					<RefreshCcw className="h-4 w-4" />
					<span>Intentar de nuevo</span>
				</ButtonGeneral>
				<Button
					variant="outline"
					className="flex items-center space-x-2"
					asChild
				>
					<a href="mailto:lguzman.58erb@outlook.com?subject=Reporte de Error">
						<Mail className="h-4 w-4" />
						<span>Reportar este problema</span>
					</a>
				</Button>
			</div>
		</main>
	)
}
