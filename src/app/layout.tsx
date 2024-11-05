import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { WhatsappFloating } from '@/components/shared/WhatsappFloating'
import { StartLogoLoader } from '@/components/start/StartLogoLoader'

const mavenPro = Maven_Pro({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BvcFarma',
	description: 'BvcFarma es un ecommerce de venta de productos farmacéuticos',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={mavenPro.className}>
				<StartLogoLoader>
					{children}
					<Toaster />
					<WhatsappFloating />
				</StartLogoLoader>
			</body>
		</html>
	)
}
