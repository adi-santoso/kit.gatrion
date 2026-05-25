import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSearchStore = create(
  persist(
    (set) => ({
      isOpen: false,
      query: '',
      openSearch: () => set({ isOpen: true }),
      closeSearch: () => set({ isOpen: false, query: '' }),
      setQuery: (query) => set({ query }),
    }),
    { name: 'devtoolkit-search' }
  )
)
