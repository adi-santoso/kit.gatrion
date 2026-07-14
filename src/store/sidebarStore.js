import { create } from 'zustand'

export const useSidebarStore = create((set) => ({
  isOpen: false,
  toggleSidebar: () => {
    console.log('toggleSidebar called')
    set((state) => {
      console.log('toggleSidebar: isOpen changing from', state.isOpen, 'to', !state.isOpen)
      return { isOpen: !state.isOpen }
    })
  },
  closeSidebar: () => {
    console.log('closeSidebar called')
    set({ isOpen: false })
  },
}))
