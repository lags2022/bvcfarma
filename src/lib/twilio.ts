import twilio from 'twilio'

export const clientTwilio = new twilio.Twilio(
	process.env.TWILIO_WHATSAPP_ACCOUNT_SID!,
	process.env.TWILIO_WHATSAPP_AUTH_TOKEN!,
)
