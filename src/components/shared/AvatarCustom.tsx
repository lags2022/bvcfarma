import { Session } from 'next-auth'

import { AVATAR_FALLBACK } from '@/constants/general'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const AvatarCustom = ({
	session,
	image,
	name,
}: {
	session?: Session | null
	image?: string
	name?: string
}) => {
  const nameParsed = session ? session?.user
  ?.name : name
  const imageParsed = session ? session?.user
  ?.image : image

	return (
		<Avatar className="size-7">
			<AvatarImage src={imageParsed || ''} />
			<AvatarFallback>
        {nameParsed!.split(' ')
					.slice(0, 2)
					.map((part: string) => part[0])
					.join('')
					.toLocaleUpperCase()}
			</AvatarFallback>
		</Avatar>
	)
}
