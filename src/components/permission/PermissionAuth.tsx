import { auth } from '@/auth'

export const PermissionAuth = async ({
	children,
}: {
	children: React.ReactNode
}) => {
	const session = await auth()

	if (!session) {
		return <p>No has iniciado sesión para ver este contenido</p>
	}

	return <>{children}</>
}
