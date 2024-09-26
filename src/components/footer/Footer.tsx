import { Facebook } from '../svg/Facebook'
import { Instagram } from '../svg/Instagram'
import { Youtube } from '../svg/Youtube'

export const Footer = () => {
	return (
		<footer className="bg-white text-gray-600 py-8 px-4 text-sm">
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
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
						<li>
							<a href="#" className="hover:text-blue-600">
								Plan de Referidos
							</a>
						</li>
						<li>Fono: (+51) 987 654 321</li>
					</ul>
				</div>
				<div>
					<h3 className="font-semibold mb-4">Síguenos</h3>
					<div className="flex space-x-4 mb-6">
						<a href="#" className="text-gray-400 hover:text-gray-500">
							<Instagram className="size-6" />
						</a>
						<a href="#" className="text-gray-400 hover:text-gray-500">
							<Facebook className="size-6" />
						</a>
						<a href="#" className="text-gray-400 hover:text-gray-500">
							<Youtube className="size-6" />
						</a>
					</div>
					<div className="mb-6">
						{/* <Image
							src="/placeholder.svg?height=60&width=120"
							alt="Libro de Reclamaciones"
							width={120}
							height={60}
						/> */}
					</div>
					<h3 className="font-semibold mb-4">Medios de pago</h3>
					<div className="flex space-x-2">
						{/* <Image
							src="/placeholder.svg?height=30&width=50"
							alt="American Express"
							width={50}
							height={30}
						/>
						<Image
							src="/placeholder.svg?height=30&width=50"
							alt="Oh!"
							width={50}
							height={30}
						/>
						<Image
							src="/placeholder.svg?height=30&width=50"
							alt="Mastercard"
							width={50}
							height={30}
						/>
						<Image
							src="/placeholder.svg?height=30&width=50"
							alt="PagoEfectivo"
							width={50}
							height={30}
						/> */}
					</div>
				</div>
			</div>
		</footer>
	)
}
