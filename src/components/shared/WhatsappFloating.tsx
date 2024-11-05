import { auth } from '@/auth'

import { ChatAssistant } from '../chat/ChatAssitant'

export const WhatsappFloating = async () => {
	const session = await auth()
	const user = session?.user

	return <ChatAssistant userName={user?.name} userImage={user?.image} />
}
