import { Session } from 'next-auth'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export const AvatarCustom = ({ session }: { session?: Session | null }) => {
	return (
		<Avatar className="size-7">
			<AvatarImage src="https://github.com/shadcn.png" />
			<AvatarFallback>
				{session?.user
					?.name!.split(' ')
					.slice(0, 2)
					.map((part: string) => part[0])
					.join('')
					.toLocaleUpperCase()}
			</AvatarFallback>
		</Avatar>
	)
}
