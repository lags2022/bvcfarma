import { PermissionAuth } from "@/components/permission/PermissionAuth"

export default function LayoutFavorites({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <PermissionAuth>{children}</PermissionAuth>
}
