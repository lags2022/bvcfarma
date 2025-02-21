import Image from 'next/image'
import Link from 'next/link'

import { Social } from '../social/Social'
import { ComplaintsBook } from '../svg/ComplaintsBook'
import { Mastercard } from '../svg/Mastercard'
import { Visa } from '../svg/Visa'

export const Footer = () => {
	return (
		<footer className="bg-picker-1 text-gray-600 py-8 px-4 text-sm">
			<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
				<div>
					<h3 className="font-semibold mb-4">Sobre Bvcfarma</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="hover:text-blue-600">
								Catálogo del mes
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Boticas 24 horas
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Farmacia Vecina
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Productos Equivalentes
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Call Center - Términos y Condiciones
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="font-semibold mb-4">Bvcfarma Digital</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="hover:text-blue-600">
								Blog
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Legales de Campañas
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Retiro en Tienda
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Servicio Express
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Zonas de cobertura
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Términos y Condiciones Generales
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Políticas de privacidad
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								Comprobante electrónico
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-blue-600">
								WhatsApp - Términos y Condiciones
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="font-semibold mb-4">Contáctanos</h3>
					<ul className="space-y-2">
						<li>
							<a href="#" className="hover:text-blue-600">
								Preguntas Frecuentes
							</a>
						</li>
						<li>Fono: (+51) 987 654 321</li>
					</ul>
				</div>
				<div className="space-y-4 [&_h3]:font-semibold">
					<div className="space-y-4">
						<h3>Síguenos</h3>
						<Social className=" justify-start [&>a>svg]:text-gray-400 hover:[&>a>svg]:text-gray-500" />
					</div>
					<div className="">
						<h3>Libro de Reclamaciones</h3>
						<Link href="/complaints">
							<ComplaintsBook className="fill-picker-1 h-8 mt-2" />
						</Link>
					</div>
					<div>
						<h3>Medios de pago</h3>
						<div className="flex justify-start items-center space-x-4">
							<Visa className="h-10" />
							<Mastercard className="h-11" />
							<Image
								src="https://res.cloudinary.com/dvozbuwkx/image/upload/v1727719802/yape_ktmvji.png"
								alt="Yape"
								width={26}
								height={26}
							/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
