import { Dashboard } from '@/components/dashboard/Dashboard'
import { PermissionRoleOwner } from '@/components/permission/PermissionRoleOwner'
import { ThemeProvider } from '@/providers/Theme.provider'

export default function LayoutDashboard({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<PermissionRoleOwner>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<Dashboard>{children}</Dashboard>
			</ThemeProvider>
		</PermissionRoleOwner>
	)
}
