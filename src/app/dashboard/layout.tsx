import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { PermissionRoleOwner } from '@/components/permission/PermissionRoleOwner'
import { ThemeProvider } from '@/providers/Theme.provider'

const mavenPro = Maven_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Dashboard de BvcFarma',
}

export default function LayoutDashboard({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={`${mavenPro.className} text-base`}>
				<PermissionRoleOwner>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
						{children}
						<Toaster />
					</ThemeProvider>
				</PermissionRoleOwner>
			</body>
		</html>
	)
}
