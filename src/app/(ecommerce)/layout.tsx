import { Footer } from '@/components/footer/Footer'
import { Navbar } from '@/components/navbar/Navbar'
import { WhatsappLink } from '@/components/shared/WhatsappLink'

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
			<WhatsappLink className="size-14 fixed bottom-5 right-5 hover:scale-110 transition-transform ease-in-out duration-300 active:scale-90 cursor-pointer" />
		</div>
	)
}
