import { DataPickerShared } from '@/components/shared/dashboard/DataPickerShared'

import { DashboardTopProductsFetch } from './DashboardTopProductsFetch'
import { DashboardWrapperItem } from '../DashboardWrapperItem'

export const DashboardTopProducts = () => {
	return (
		<DashboardWrapperItem>
			<div className="flex flex-col gap-3 h-full justify-between">
				<div className="flex justify-between">
					<div>
						<h4 className="font-semibold mb-1">Top Productos</h4>
						<DataPickerShared />
					</div>
					<p className="text-sm font-medium">Ver todos</p>
				</div>
				<DashboardTopProductsFetch />
			</div>
		</DashboardWrapperItem>
	)
}
