import { Footer } from '@/components/footer/Footer'
import { Navbar } from '@/components/navbar/Navbar'
import { WhatsappFloating } from '@/components/shared/WhatsappFloating'
import { ThemeProvider } from '@/providers/Theme.provider'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ThemeProvider attribute="class" forcedTheme='light'>
			<div className="bg-gray-100">
				<Navbar />
				<main className="mt-[140px]">{children}</main>
				<Footer />
				<WhatsappFloating />
			</div>
		</ThemeProvider>
	)
}
