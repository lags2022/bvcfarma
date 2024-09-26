import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import {
	addFavoriteAction,
	removeFavoriteAction,
} from '@/actions/favorite-action'

interface FavoriteStore {
	favorites: number[]
	addFavorite: (productId: number) => Promise<void>
	removeFavorite: (productId: number) => Promise<void>
	setFavorites: (favorites: number[]) => void
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
	favorites: [],
	setFavorites: (favorites: number[]) => set({ favorites }),

	addFavorite: async (productId) => {
		try {
			const response = await addFavoriteAction(productId)

			if (response?.status !== 'success') {
				throw new Error('Error al agregar favorito')
			}

			set((state) => ({
				favorites: [...state.favorites, productId],
			}))
		} catch (error) {
			console.log(error, 'Error al agregar favorito')
		}
	},

	removeFavorite: async (productId) => {
		try {
			const response = await removeFavoriteAction(productId)

			if (response?.status !== 'success') {
				throw new Error('Error al eliminar favorito')
			}

			set((state) => ({
				favorites: state.favorites.filter((id) => id !== productId),
			}))
		} catch (error) {
			console.log(error, 'Error al eliminar favorito')
		}
	},
}))
