import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { Footer } from '@/components/footer/Footer'
import { Navbar } from '@/components/navbar/Navbar'
import { WhatsappLink } from '@/components/shared/WhatsappLink'

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
			<body className={`${mavenPro.className} text-base bg-white`}>
				<Navbar />
				<main className="mt-[140px]">{children}</main>
				<Footer />
				<WhatsappLink className="size-14 fixed bottom-5 right-5 hover:scale-110 transition-transform ease-in-out duration-300 active:scale-90 cursor-pointer" />
				<Toaster />
			</body>
		</html>
	)
}

{
	/* <ThemeProvider attribute="class" defaultTheme="ligth" enableSystem> */
}
