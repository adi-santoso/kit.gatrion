import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter(fav => fav !== id)
          : [...state.favorites, id]
      })),
    }),
    { name: 'devtoolkit-favorites' }
  )
)
