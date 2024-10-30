import { getUserWithAddress } from '@/actions/user-action'

import { Profile } from './Profile'
import { ButtonGeneral } from '../button/ButtonGeneral'

export const ProfileFetch = async () => {
	const user = await getUserWithAddress()

	if (!user)
		return (
			<div className="contain m-auto flex flex-col justify-center items-center gap-6 py-6">
				<div>El usuario no existe.</div>

				<ButtonGeneral href="/">Ir a la página de inicio</ButtonGeneral>
			</div>
		)

	return <Profile user={user} />
}
