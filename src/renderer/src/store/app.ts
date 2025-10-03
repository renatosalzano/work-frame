import { create } from 'zustand'

type Store = {
  settings: boolean
  current_webview?: string
  set_current_webview(name?: string): void
  toggle_settings(show?: boolean): void

  backdrop: boolean
  setBackdrop(show?: boolean): void
}

export const useAppState = create<Store>(
  (set, get) => ({

    settings: false,

    set_current_webview(name) {
      set({ current_webview: name })
    },

    toggle_settings(show) {

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