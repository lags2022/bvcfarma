import { auth } from '@/auth'

export const PermissionRole = async ({
	children,
}: {
	children: React.ReactNode
}) => {
	const session = await auth()

	if (session?.user?.role === 'ADMIN') {
		return <main>{children}</main>
	}

	return <p>Tu no tienes permisos para ver este contenido</p>
}
