import { auth } from '@/auth'
import { DashboardCustomerRate } from '@/components/dashboard/dashboard-general/DashboardCustomerRate'
import { DashboardHero } from '@/components/dashboard/dashboard-general/DashboardHero'
import { DashboardIndicatorsContainer } from '@/components/dashboard/dashboard-general/DashboardIndicators'
import { DashboardOrders } from '@/components/dashboard/dashboard-general/DashboardOrders'
import { DashboardProfit } from '@/components/dashboard/dashboard-general/DashboardProfit'
import { DashboardPromotions } from '@/components/dashboard/dashboard-general/DashboardPromotions'
import { DashboardSales } from '@/components/dashboard/dashboard-general/DashboardSales'
import { DashboardStock } from '@/components/dashboard/dashboard-general/DashboardStock'
import { DashboardTopProducts } from '@/components/dashboard/dashboard-general/DashboardTopProducts'
import { DashboardUserLocation } from '@/components/dashboard/dashboard-general/DashboardUserLocation'

export default async function PageDashboard() {
	const session = await auth()
	const name = session?.user.name

	return (
		<div className="grid gap-4 grid-cols-8">
			<div className="order-first grid gap-4 col-span-8 xl:col-span-5 ">
				<DashboardHero name={name || 'Usuario'} />
				<div className="flex flex-col md:flex-row gap-4">
					<DashboardIndicatorsContainer />
				</div>
			</div>
			<div className="flex col-span-8 order-1 xl:order-none md:col-span-4 xl:col-span-3">
				<DashboardProfit />
			</div>
			<div className="flex col-span-8 order-3 xl:order-none xl:col-span-5">
				<DashboardSales />
			</div>
			<div className="flex col-span-8 order-2 xl:order-none md:col-span-4 xl:col-span-3">
				<DashboardPromotions />
			</div>
			<div className="xl:order-none order-4 col-span-8">
				<DashboardOrders />
			</div>
			<div className="col-span-8 order-5 xl:order-none xl:col-span-5">
				<DashboardCustomerRate />
			</div>
			<div className="flex col-span-8 md:col-span-4 order-6 xl:order-none xl:col-span-3">
				<DashboardTopProducts />
			</div>
			<div className="flex col-span-8 md:col-span-4 order-7 xl:order-none xl:col-span-3">
				<DashboardUserLocation />
			</div>
			<div className="flex col-span-8 order-last xl:order-none xl:col-span-5">
				<DashboardStock />
			</div>
		</div>
	)
}
