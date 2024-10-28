import { Session } from 'next-auth'

import { auth } from '@/auth'

export const PermissionRoleOwnerSharedSession = async ({
	children,
}: {
	children: (session: Session) => React.ReactNode
}) => {
	const session = await auth()

	if (session?.user?.role === 'OWNER') {
		return <>{children(session)}</>
	}

	return <p>Tu no tienes permisos para ver este contenido</p>
}
