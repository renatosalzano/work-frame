import { create } from 'zustand'

type Store = {
  settings: boolean
  currentWebview?: string
  setCurrentWebview(name: string): void
  toggleSettings(show?: boolean): void

  backdrop: boolean
  setBackdrop(show?: boolean): void
}

export const useAppState = create<Store>(
  (set, get) => ({

    settings: false,

    setCurrentWebview(name) {
      set({ currentWebview: name })
    },

    toggleSettings(show) {

      set((prev) => {

        console.log(show !== undefined)

        prev.settings = show !== undefined
          ? show
          : !prev.settings

        prev.backdrop = prev.settings

        return { ...prev }
      })
    },

    backdrop: false,

    setBackdrop(show = false) {

      set({ backdrop: show })

    },

  })
)