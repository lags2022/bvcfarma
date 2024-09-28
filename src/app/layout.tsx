import './globals.css'
import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

const mavenPro = Maven_Pro({ subsets: ['latin'] })
// const inter= Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BvcFarma',
	description:
		'Farmacia Bvc Es un ecommerce de venta de productos farmacéuticos',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={`${mavenPro.className} text-sm bg-white`}>
				<ThemeProvider attribute="class" defaultTheme="ligth" enableSystem>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
