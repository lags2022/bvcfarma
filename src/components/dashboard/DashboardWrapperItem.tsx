import { cn } from '@/lib/utils'

export const DashboardWrapperItem = ({
	children,
	isHero,
}: {
	children: React.ReactNode
	isHero?: boolean
}) => {
	return (
		<div
			className={cn(
				'w-full mx-auto p-4 md:p-6 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-inherit',
				isHero && 'p-6 xl:py-0',
			)}
		>
			{children}
		</div>
	)
}
