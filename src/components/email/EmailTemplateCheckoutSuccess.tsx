import { Order, OrderAddress, OrderItemProduct } from '@prisma/client'
import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
	Button,
} from '@react-email/components'
import { CSSProperties } from 'react'

import {
	URL_BASE,
	COLOR_PRIMARY,
	ICON_FACEBOOK,
	ICON_INSTAGRAM,
	ICON_WHATSAPP,
	ICON_YOUTUBE,
	LOGO_NAME_2,
	URL_WHATSAPP,
} from '@/constants/general'
import { modDate } from '@/helpers/mod-date'

export const EmailTemplate = ({
	order,
}: {
	order: Order & {
		orderAddress?: OrderAddress | null
		orderItems?: OrderItemProduct[]
	}
}) => {
	return (
		<Html>
			<Head />
			<Preview>
				Obtenga el resumen de su pedido, la fecha de entrega estimada y más
			</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={track.container}>
						<Row align="center">
							<Column align="center">
								<Img
									src={LOGO_NAME_2}
									width="140"
									height="39"
									alt="BvcFarma"
									style={{ margin: '10px 20px' }}
								/>
							</Column>
						</Row>
					</Section>
					<Hr style={global.hr} />
					<Section style={message}>
						<Heading style={global.heading}>Tu pedido está en camino.</Heading>
						<Text style={{ ...global.text, marginTop: '10px' }}>
							Utilice el siguiente enlace para seguir su progreso.
						</Text>
						<Button
							style={{ ...button, margin: '10px auto' }}
							href={`${URL_BASE}/orders`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Text style={{ margin: '0px' }}>Estado de Ordenes</Text>
						</Button>
					</Section>
					{/* <Section style={track.container}>
					<Row>
						<Column>
							<Text style={global.paragraphWithBold}>Tracking Number</Text>
							<Text style={track.number}>1ZV218970300071628</Text>
						</Column>
						<Column align="right">
							<Link style={global.button}>Track Package</Link>
						</Column>
					</Row>
				</Section> */}
					<Hr style={global.hr} />
					<Section style={global.defaultPadding}>
						<Text style={adressTitle}>
							Envío a:{' '}
							{`${order?.orderAddress?.firstName || ''} ${order?.orderAddress?.lastName || ''}`}
						</Text>
						<Text style={{ ...global.text, fontSize: 14 }}>
							Dirección: {order?.orderAddress?.address || ''}
						</Text>
					</Section>
					<Hr style={global.hr} />
					<Section
						style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
					>
						{order?.orderItems?.map((item) => (
							<Row align="center" key={item.id}>
								<Column>
									<Img src={item.image} alt={item.name} width="40px" />
								</Column>
								<Column
									align="left"
									style={{ verticalAlign: 'top', paddingLeft: '12px' }}
								>
									<Text style={{ ...paragraph, fontWeight: '500' }}>
										{item.name}
									</Text>
									<Text style={global.text}>
										S./ {item.subtotalItem} ({item.quantity}{' '}
										{item.quantity === 1 ? 'item' : 'items'})
									</Text>
								</Column>
							</Row>
						))}

						{/* <Row>
							<Column>
								<Img
									src={`${baseUrl}/static/nike-product.png`}
									alt="ddd"
									style={{ float: 'left' }}
									width="60px"
								/>
							</Column>
							<Column style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
								<Text style={{ ...paragraph, fontWeight: '500' }}>
									Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey
								</Text>
								<Text style={global.text}>Size L (12–14)</Text>
							</Column>
						</Row> */}
					</Section>
					<Hr style={global.hr} />
					<Section style={global.defaultPadding}>
						<Row style={{ display: 'flex', marginBottom: 20 }}>
							<Column style={{ paddingRight: '20px' }}>
								<Text style={global.paragraphWithBold}>Order Number</Text>
								<Text style={track.number}>{order?.ocNumber || ''}</Text>
							</Column>
							<Column>
								<Text style={global.paragraphWithBold}>Order Date</Text>
								<Text style={track.number}>
									{modDate(order?.paidAt as Date, 'full') || ''}
								</Text>
							</Column>
						</Row>
					</Section>
					<Hr style={global.hr} />
					<Section style={menu.container}>
						<Row align="center">
							<Text
								style={{
									...menu.title,
									marginTop: '0px',
									textAlign: 'center',
								}}
							>
								Obtener ayuda
							</Text>
						</Row>
						<Row>
							<Link
								style={{ ...button, display: 'flex', justifyContent: 'center' }}
								href={URL_WHATSAPP}
								target="_blank"
								rel="noopener noreferrer"
							>
								{/* <Section style={{ display: 'flex', justifyContent: 'center' }}>
									<Column> */}
								<Img
									src={ICON_WHATSAPP}
									width="26"
									height="26"
									alt="Whatsapp"
									style={{ marginRight: '10px' }}
								/>
								{/* </Column> */}
								{/* <Column> */}
								<Text style={{ margin: '0px' }}>Ir a whatsapp</Text>
								{/* </Column> */}
								{/* </Section> */}
							</Link>
						</Row>
						<Row>
							<Column style={{ padding: '10px 20px', fontSize: '12px' }}>
								Por favor contáctenos por whatsapp si tiene alguna pregunta. (No
								responda a este correo electrónico, no podremos verlo).
							</Column>
						</Row>
						<Hr style={global.hr} />
					</Section>
					<Hr style={global.hr} />
					<Section style={{ margin: '15px 0' }}>
						<Row style={{ marginBottom: '10px' }}>
							<Column align="center">
								<Link
									target="_blank"
									rel="noopener noreferrer"
									href={URL_BASE}
									style={{
										...global.heading,
										fontSize: '16px',
										textDecoration: 'none',
										color: COLOR_PRIMARY,
									}}
								>
									bvcfarma.vercel.app
								</Link>
							</Column>
							<Column align="center">
								<Section style={{ display: 'flex', justifyContent: 'center' }}>
									<Row>
										<Column>
											<Link href="/">
												<Img
													src={ICON_INSTAGRAM}
													width="24"
													height="24"
													alt="Instagram"
													style={socialMediaIcon}
												/>
											</Link>
										</Column>
										<Column>
											<Link href="/">
												<Img
													src={ICON_FACEBOOK}
													width="24"
													height="24"
													alt="Facebook"
													style={socialMediaIcon}
												/>
											</Link>
										</Column>
										<Column>
											<Link href="/">
												<Img
													src={ICON_YOUTUBE}
													width="24"
													height="24"
													alt="Youtube"
													style={socialMediaIcon}
												/>
											</Link>
										</Column>
									</Row>
								</Section>
							</Column>
						</Row>
						<Row>
							<Text style={footer.text}>
								© 2024 Bvcfarma. Todos los derechos reservados.
							</Text>
						</Row>
						<Row>
							<Text style={footer.text}>
								BVCFARMA S.A.C., Av. América Sur 1234, Urb. Primavera, Trujillo,
								La Libertad, Perú.
							</Text>
						</Row>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

const paddingX = {
	paddingLeft: '40px',
	paddingRight: '40px',
}

const paddingY = {
	paddingTop: '22px',
	paddingBottom: '22px',
}

const paragraph = {
	margin: '0',
	lineHeight: '2',
}

const global = {
	paddingX,
	paddingY,
	defaultPadding: {
		...paddingX,
		...paddingY,
	},
	paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
	heading: {
		fontSize: '24px',
		lineHeight: '1.3',
		fontWeight: '700',
		textAlign: 'center',
		letterSpacing: '-1px',
		marginTop: '15px',
	} as CSSProperties,
	text: {
		...paragraph,
		color: '#747474',
		fontWeight: '500',
	},
	button: {
		border: '1px solid #929292',
		fontSize: '16px',
		textDecoration: 'none',
		padding: '10px 0px',
		width: '220px',
		display: 'block',
		textAlign: 'center',
		fontWeight: 500,
		color: '#000',
	} as CSSProperties,
	hr: {
		borderColor: '#E5E5E5',
		margin: '0',
	},
}

const main = {
	backgroundColor: '#ffffff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
	margin: '10px auto',
	width: '600px',
	maxWidth: '100%',
	border: '1px solid #E5E5E5',
}

const track = {
	container: {
		padding: '22px 40px',
		backgroundColor: '#F7F7F7',
	},
	number: {
		margin: '12px 0 0 0',
		fontWeight: 500,
		lineHeight: '1.4',
		color: '#6F6F6F',
	},
}

const message = {
	padding: '40px 74px',
	textAlign: 'center',
} as CSSProperties

const adressTitle = {
	...paragraph,
	fontSize: '15px',
	fontWeight: 'bold',
}

const recomendationsText = {
	margin: '0',
	fontSize: '15px',
	lineHeight: '1',
	paddingLeft: '10px',
	paddingRight: '10px',
}

const recomendations = {
	container: {
		padding: '20px 0',
	},
	product: {
		verticalAlign: 'top',
		textAlign: 'left' as const,
		paddingLeft: '2px',
		paddingRight: '2px',
	},
	title: { ...recomendationsText, paddingTop: '12px', fontWeight: '500' },
	text: {
		...recomendationsText,
		paddingTop: '4px',
		color: '#747474',
	},
}

const menu = {
	container: {
		paddingLeft: '20px',
		paddingRight: '20px',
		paddingTop: '20px',
		backgroundColor: '#F7F7F7',
	},
	content: {
		...paddingY,
		paddingLeft: '20px',
		paddingRight: '20px',
	},
	title: {
		paddingLeft: '20px',
		paddingRight: '20px',
		fontWeight: 'bold',
	},
	text: {
		fontSize: '13.5px',
		marginTop: 0,
		fontWeight: 500,
		color: '#000',
	},
	tel: {
		paddingLeft: '20px',
		paddingRight: '20px',
		paddingTop: '32px',
		paddingBottom: '22px',
	},
}

const categories = {
	container: {
		width: '370px',
		margin: 'auto',
		paddingTop: '12px',
	},
	text: {
		fontWeight: '500',
		color: '#000',
	},
}

const footer = {
	policy: {
		width: '166px',
		margin: 'auto',
	},
	text: {
		margin: '0',
		color: '#AFAFAF',
		fontSize: '13px',
		textAlign: 'center',
	} as CSSProperties,
}

const socialMediaIcon = {
	display: 'inline',
	marginLeft: '32px',
}

const button = {
	backgroundColor: COLOR_PRIMARY,
	borderRadius: '5px',
	color: '#fff',
	fontSize: '16px',
	fontWeight: 'bold',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	width: '90%',
	padding: '10px 20px',
	margin: 'auto',
}
