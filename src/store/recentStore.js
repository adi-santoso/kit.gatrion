import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useRecentStore = create(
  persist(
    (set) => ({
      recents: [],
      addRecent: (id) => set((state) => {
        const filtered = state.recents.filter(r => r !== id)
        return { recents: [id, ...filtered].slice(0, 5) }
      }),
    }),
    { name: 'devtoolkit-recent' }
  )
)
