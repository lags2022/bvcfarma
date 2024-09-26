export interface CulqiWebhookEvent {
	object: string
	id: string
	type: EventType
	creation_date: number
	data: ChargeData | ErrorData
}

enum EventType {
	ChargeSucceeded = 'charge.creation.succeeded',
	ChargeFailed = 'charge.creation.failed',
}

enum OutcomeType {
	SuccessfulSale = 'venta_exitosa',
	FailedSale = 'card_declined',
}

interface AntifraudDetails {
	address: string
	addressCity: string
	countryCode: string
	lastName: string
	firstName: string
	phone: string
}

interface IINDetails {
	object: string
	bin: string
	cardBrand: string
	cardType: string
	cardCategory: string | null
	issuer: {
		name: string
		country: string
		countryCode: string
		website: string
		phoneNumber: string
	}
	installmentsAllowed: []
}

interface ClientDetails {
	ip: string
	ipCountry: string
	ipCountryCode: string
	browser: string
	deviceFingerprint: string | null
	deviceType: string
}

interface SourceDetails {
	object: string
	id: string
	type: string
	email: string
	creationDate: number
	cardNumber: string
	lastFour: string
	active: boolean
	iin: IINDetails
	client: ClientDetails
	metadata: Record<string, any>
}

export interface ChargeData {
	object: string
	capture: boolean
	captureDate: number
	authorizationCode: string
	amountRefunded: number
	currencyCode: string
	email: string
	antifraudDetails: AntifraudDetails
	source: SourceDetails
	feeDetails: {
		fixedFee: {}
		variableFee: {
			currencyCode: string
			commision: number
			total: number
		}
	}
	currentAmount: number
	amount: number
	duplicated: boolean
	installments: number
	installmentsAmount: number | null
	creationDate: number
	description: string
  fraudScore?: number
	id: string
	referenceCode: string
	metadata: Record<string, any>
	transferId: string | null
	outcome: {
		code: string
		merchantMessage: string
		userMessage: string
		type: OutcomeType
	}
	dispute: boolean
	statementDescriptor: string
	paid: boolean
	totalFee: number
	totalFeeTaxes: number
	transferAmount: number
}

interface ErrorData {
	object: string
	type: string
	declineCode: string
	merchantMessage: string
	userMessage: string
	code: string
}
