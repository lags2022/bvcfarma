import { Footer } from '@/components/footer/Footer'
import { Navbar } from '@/components/navbar/Navbar'
import { WhatsappLink } from '@/components/shared/WhatsappLink'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Navbar />
			<main className="bg-gray-100 mt-36 h-full">{children}</main>
			<Footer />
			<WhatsappLink className="size-14 fixed bottom-5 right-5 hover:scale-110 transition-transform ease-in-out duration-300 active:scale-90 cursor-pointer" />
		</>
	)
}
