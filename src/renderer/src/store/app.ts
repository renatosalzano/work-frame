import { create } from 'zustand'


export type CurrentSection = 'webview'

type Store = {
  settings: boolean
  current_section: CurrentSection
  current_webview?: { id: string, name: string }
  set_current_webview(current?: { id: string, name: string }): void
  toggle_settings(show?: boolean): void

  backdrop: boolean
  setBackdrop(show?: boolean): void
}

export const useAppState = create<Store>(
  (set, get) => ({

    current_section: 'webview',

    settings: false,

    set_current_webview(current) {
      console.log('selected webview:', current?.name)
      set({ current_webview: current })
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