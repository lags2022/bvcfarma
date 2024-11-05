import { Footer } from '@/components/footer/Footer'
import { Navbar } from '@/components/navbar/Navbar'
import { WhatsappFloating } from '@/components/shared/WhatsappFloating'
import { ThemeProvider } from '@/providers/Theme.provider'
import { TransitionPageProvider } from '@/providers/TransitionPageProvider'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ThemeProvider attribute="class" forcedTheme="light">
			<div className="bg-gray-100">
				<Navbar />
				<main className="mt-[140px]">
					<TransitionPageProvider>{children}</TransitionPageProvider>
				</main>
				<Footer />
				<WhatsappFloating />
			</div>
		</ThemeProvider>
	)
}
