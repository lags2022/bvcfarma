import { getUserWithUserAddressAction } from '@/actions/user-action'
import { ButtonGeneral } from '@/components/button/ButtonGeneral'
import { Profile } from '@/components/profile/Profile'

export default async function PageProfile() {
	const user = await getUserWithUserAddressAction()

	if (!user)
		return (
			<div className="contain m-auto flex flex-col justify-center items-center gap-6 py-6">
				<div>El usuario no existe.</div>

				<ButtonGeneral href="/">Ir a la página de inicio</ButtonGeneral>
			</div>
		)

	return <Profile user={user} />
}
