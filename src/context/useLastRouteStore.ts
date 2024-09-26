// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// interface LastRouteState {
// 	lastRoute: string
// 	setLastRoute: (lastRoute: string) => void
// }

// export const useLastRouteStore = create<LastRouteState>()(
// 	persist(
// 		(set) => ({
// 			lastRoute: '',
// 			setLastRoute: (lastRoute) => set({ lastRoute }),
// 		}),
// 		{
// 			name: 'last-route',
// 		},
// 	),
// )
