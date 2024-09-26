import { PermissionAuth } from '@/components/permission/PermissionAuth'

export default function LayoutOrders({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <PermissionAuth>{children}</PermissionAuth>
}
