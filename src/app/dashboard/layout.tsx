import { DashboardProvider } from '@/components/dashboard/Dashboard'
import { PermissionRoleOwnerSharedSession } from '@/components/permission/PermissionRoleOwnerSharedSession'
import { ThemeProvider } from '@/providers/Theme.provider'
import 'react-datepicker/dist/react-datepicker.css'

export default async function LayoutDashboard({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<PermissionRoleOwnerSharedSession>
			{(session) => (
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
					<DashboardProvider session={session}>{children}</DashboardProvider>
				</ThemeProvider>
			)}
		</PermissionRoleOwnerSharedSession>
	)
}
