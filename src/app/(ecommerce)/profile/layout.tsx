import { PermissionAuth } from '@/components/permission/PermissionAuth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<PermissionAuth>
			<div className="container mx-auto text-sm p-4">
				<Card className="max-w-3xl mx-auto">
					<CardHeader>
						<CardTitle className="text-lg font-bold">
							Perfil de Usuario
						</CardTitle>
						<CardDescription>
							Actualiza tu información personal y configuración de la cuenta
						</CardDescription>
					</CardHeader>
					<CardContent>{children}</CardContent>
				</Card>
			</div>
		</PermissionAuth>
	)
}
