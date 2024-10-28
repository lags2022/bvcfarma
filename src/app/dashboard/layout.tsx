import { Dashboard } from '@/components/dashboard/Dashboard'
import { PermissionRoleOwnerSharedSession } from '@/components/permission/PermissionRoleOwnerSharedSession'
import { ThemeProvider } from '@/providers/Theme.provider'

export default async function LayoutDashboard({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<PermissionRoleOwnerSharedSession>
			{(session) => (
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<Dashboard session={session}>{children}</Dashboard>
				</ThemeProvider>
			)}
		</PermissionRoleOwnerSharedSession>
	)
}
