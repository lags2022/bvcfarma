import { zodResolver } from '@hookform/resolvers/zod'
import { MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useShallow } from 'zustand/react/shallow'

import { getUserAction } from '@/actions/user-action'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { PersonData, useCheckoutStore } from '@/context/useCheckoutStore'
import { formatTypeDocument } from '@/helpers/enum-mod'
import { checkoutPersonDataSchema } from '@/schemas/checkout-schema'

export const CheckoutAddress = () => {
	const { setPersonData, personData, setPersonDataEmail } = useCheckoutStore(
		useShallow((state) => ({
			personData: state.personData,
			setPersonData: state.setPersonData,
			setPersonDataEmail: state.setPersonDataEmail,
		})),
	)

	const {
		control,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(checkoutPersonDataSchema),
		defaultValues: personData,
	})

	useEffect(() => {
		const fetchGetUser = async () => {
			const user = await getUserAction()
			if (!user) {
				setPersonDataEmail('')
				return
			}
			setPersonDataEmail(user.email)
			setValue('email', user.email)
		}
		fetchGetUser()
	}, [setPersonDataEmail, setValue])

	const handleChange = (name: keyof PersonData, value: string) => {
		setPersonData((state: PersonData) => ({
			...state,
			[name]: value,
		}))
		setValue(name, value)
		trigger(name)
	}

	return (
		<Card>
			<AccordionItem value="personalInfo" className="border-none">
				<AccordionTrigger className="font-semibold text-base px-6 py-4">
					<span className="flex items-center">
						<MapPin className="mr-2" />
						Completa tus datos
					</span>
				</AccordionTrigger>

				<AccordionContent className="px-6 pb-4">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="firstName">Nombre</Label>
								<Controller
									name="firstName"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="firstName"
											placeholder="Ingrese su nombre"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
								{errors.firstName && (
									<p className="text-red-500 text-sm mt-1">
										{errors.firstName.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="lastName">Apellidos</Label>
								<Controller
									name="lastName"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="lastName"
											placeholder="Ingrese sus apellidos"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
								{errors.lastName && (
									<p className="text-red-500 text-sm mt-1">
										{errors.lastName.message}
									</p>
								)}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="phone">Teléfono de contacto</Label>
								<Controller
									name="phone"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="phone"
											placeholder="Ingrese su teléfono"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
								{errors.phone && (
									<p className="text-red-500 text-sm mt-1">
										{errors.phone.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="email">Correo electrónico</Label>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="email"
											disabled
											className="!cursor-default !select-none"
										/>
									)}
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">
										{errors.email.message}
									</p>
								)}
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="typeDocument">
									Documento de identificación
								</Label>
								<Controller
									name="typeDocument"
									control={control}
									render={({ field }) => (
										<Select
											onValueChange={(value) => handleChange(field.name, value)}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Seleccione tipo de documento" />
											</SelectTrigger>
											<SelectContent>
												{formatTypeDocument.map((item) => (
													<SelectItem key={item.value} value={item.value}>
														{item.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								{errors.typeDocument && (
									<p className="text-red-500 text-sm mt-1">
										{errors.typeDocument.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="numberDocument">N° de documento</Label>
								<Controller
									name="numberDocument"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="numberDocument"
											placeholder="Ingrese número"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
								{errors.numberDocument && (
									<p className="text-red-500 text-sm mt-1">
										{errors.numberDocument.message}
									</p>
								)}
							</div>
						</div>
						<div>
							<h4 className="font-medium mb-2">
								¿En dónde recibirás tu pedido?
							</h4>
							<div className="grid grid-cols-3 gap-4">
								<div>
									<Label htmlFor="department">Departamento</Label>
									<Controller
										name="department"
										control={control}
										render={({ field }) => (
											<Select
												onValueChange={(value) =>
													handleChange(field.name, value)
												}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Seleccione" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="lima">Lima</SelectItem>
													<SelectItem value="arequipa">Arequipa</SelectItem>
													<SelectItem value="cusco">Cusco</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>
									{errors.department && (
										<p className="text-red-500 text-sm mt-1">
											{errors.department.message}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="province">Provincia</Label>
									<Controller
										name="province"
										control={control}
										render={({ field }) => (
											<Select
												onValueChange={(value) =>
													handleChange(field.name, value)
												}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Seleccione" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="lima">Lima</SelectItem>
													<SelectItem value="callao">Callao</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>
									{errors.province && (
										<p className="text-red-500 text-sm mt-1">
											{errors.province.message}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="district">Distrito</Label>
									<Controller
										name="district"
										control={control}
										render={({ field }) => (
											<Select
												onValueChange={(value) =>
													handleChange(field.name, value)
												}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Seleccione" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="miraflores">Miraflores</SelectItem>
													<SelectItem value="surco">Surco</SelectItem>
													<SelectItem value="barranco">Barranco</SelectItem>
												</SelectContent>
											</Select>
										)}
									/>
									{errors.district && (
										<p className="text-red-500 text-sm mt-1">
											{errors.district.message}
										</p>
									)}
								</div>
							</div>
						</div>
						<div className="grid grid-cols-7 gap-4">
							<div className="col-span-3">
								<Label htmlFor="address">Dirección</Label>
								<Controller
									name="address"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="address"
											placeholder="Ingrese dirección"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
								{errors.address && (
									<p className="text-red-500 text-sm mt-1">
										{errors.address.message}
									</p>
								)}
							</div>
							<div className="col-span-2">
								<Label htmlFor="reference">Referencia (opcional)</Label>
								<Controller
									name="reference"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="reference"
											placeholder="Ingrese referencia"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
							</div>
							<div className="col-span-2">
								<Label htmlFor="postalCode">Código postal</Label>
								<Controller
									name="postalCode"
									control={control}
									render={({ field }) => (
										<Input
											{...field}
											id="postalCode"
											placeholder="Ingrese el código postal"
											onChange={(e) => handleChange(field.name, e.target.value)}
										/>
									)}
								/>
								{errors.postalCode && (
									<p className="text-red-500 text-sm mt-1">
										{errors.postalCode.message}
									</p>
								)}
							</div>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Card>
	)
}
