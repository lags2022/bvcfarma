'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition, useOptimistic } from 'react'
import toast from 'react-hot-toast'
// import { useDebouncedCallback } from 'use-debounce'
import { useShallow } from 'zustand/react/shallow'

import { getUserAction } from '@/actions/user-action'
import { Button } from '@/components/ui/button'
import { useFavoriteStore } from '@/context/useFavoriteStore'
import { end, start } from '@/helpers/performance'
import { cn } from '@/lib/utils'

export const FavoriteButton = ({
	productId,
	className,
}: {
	productId: number
	className?: string
}) => {
	const { favorites, addFavorite, removeFavorite } = useFavoriteStore(
		useShallow((state) => ({
			favorites: state.favorites,
			addFavorite: state.addFavorite,
			removeFavorite: state.removeFavorite,
		})),
	)
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const [optmisticFavorites, modOptimisticFavorite] = useOptimistic(
		favorites,
		(state, { productId, type }) =>
			type === 'add'
				? [...state, productId]
				: state.filter((id) => id !== productId),
	)

	const handleFavorite = async (evt: any) => {
		startTransition(async () => {
			start('FAVORITO')
			if (isFavorite) {
				modOptimisticFavorite({
					productId,
					type: 'remove',
				})
				await removeFavorite(productId) // Optimistic update handled in Zustand
			} else {
				modOptimisticFavorite({
					productId,
					type: 'add',
				})
				const response = await addFavorite(productId) // Optimistic update handled in Zustand
				if (response?.status === 'errorLogin') {
					toast('Inicia sesión o regístrate', {
						icon: '👋',
					})
					router.push('/login')
				}
			}
			end()
		})
	}

	// const debouncedHandleFavorite = useDebouncedCallback(
	// 	(type: 'add' | 'remove') => {
	// 		startTransition(async () => {
	// 			modOptimisticFavorite({ productId, type })

	// 			if (type === 'add') {
	// 				await addFavorite(productId)
	// 			} else {
	// 				await removeFavorite(productId)
	// 			}
	// 		})
	// 	},
	// 	300,
	// )

	const isFavorite = optmisticFavorites.includes(productId)

	// const handleClick = async (evt: React.MouseEvent) => {
	// 	evt.stopPropagation()

	// 	const session = await getUserAction(false)
	// 	if (!session)
	// 		toast('Inicia session o regístrate', {
	// 			icon: '👋',
	// 		})

	// 	if (isFavorite) {
	// 		debouncedHandleFavorite('remove')
	// 	} else {
	// 		debouncedHandleFavorite('add')
	// 	}
	// }

	return (
		<Button
			variant="outline"
			className={cn('size-10 border-none hover:bg-white', className)}
			size="icon"
			// onClick={handleClick}
			onClick={handleFavorite}
			// disabled={isPending}
		>
			<Heart
				className={cn(
					'size-5 transition-colors ease-in-out',
					isFavorite && 'fill-red-500 text-red-500',
				)}
			/>
		</Button>
	)
}
