import { Footer } from '@/components/footer/Footer'
import { Navbar } from '@/components/navbar/Navbar'
import { WhatsappFloating } from '@/components/shared/WhatsappFloating'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="bg-gray-100">
			<Navbar />
			<main className="mt-[140px]">{children}</main>
			<Footer />
			<WhatsappFloating />
		</div>
	)
}
