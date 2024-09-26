import { PermissionAuth } from '@/components/permission/PermissionAuth'
import { CulqiProvider } from '@/providers/CulqiProvider'

export default function LayoutCheckout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<PermissionAuth>
			<CulqiProvider publicKey={process.env.CULQI_PK_TEST!}>
				{children}
			</CulqiProvider>
		</PermissionAuth>
	)
}
