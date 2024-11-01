import { Product } from '@/components/product/Product'
import { ProfileFetch } from '@/components/profile/ProfileFetch'

export default function PageDashboardProductDetail({
	params,
}: {
	params: { userId: string }
}) {
	return (
		<main className="py-4 md:py-6">
			<ProfileFetch isPageDashboard userId={params.userId} />
		</main>
	)
}
