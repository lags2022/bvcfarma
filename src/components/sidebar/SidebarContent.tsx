import { LogOut } from 'lucide-react'

import { logoutAction } from '@/actions/auth-action'
import { SIDEBAR_ITEMS } from '@/constants/dashboard'

import { SidebarItem } from './SidebarItem'

export const SidebarContent = ({
	isExpanded = true,
	handleClose,
}: {
	isExpanded?: boolean
	handleClose?: () => void
}) => {
	return (
		<>
			{/* menu de la barra lateral sidebar */}
			<div className="flex-1 overflow-y-auto">
				<nav className="flex flex-col gap-2 p-2">
					{SIDEBAR_ITEMS.map((item) => (
						<SidebarItem
							key={item.label}
							icon={item.icon}
							label={item.label}
							badge={item.badge}
							isExpanded={isExpanded}
							href={item.href}
							onClick={handleClose}
						/>
					))}
				</nav>
			</div>

			{/* boton de cerrar sesión */}
			<div className="py-4 px-2">
				<SidebarItem
					icon={<LogOut />}
					label="Cerrar sesión"
					isExpanded={isExpanded}
					onClick={async () => {
						handleClose && handleClose()
						await logoutAction()
					}}
				/>
			</div>
		</>
	)
}
