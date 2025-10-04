import { create } from 'zustand'


export type CurrentSection = 'webview'

type Store = {
  menu: boolean
  settings: boolean
  current_section: CurrentSection
  current_webview?: { id: string, name: string }
  set_current_webview(current?: { id: string, name: string }): void
  toggle_settings(show?: boolean): void
  toggle_menu(show?: boolean): void

  backdrop: boolean
  setBackdrop(show?: boolean): void
}

export const useAppState = create<Store>(
  (set, get) => ({

    menu: false,

    current_section: 'webview',

    settings: false,

    set_current_webview(current) {
      console.log('selected webview:', current?.name)
      set({ current_webview: current })

      const { settings } = get()

      if (current && !settings) {
        window.api.show_webview(current.id)
      }
    },

    toggle_menu(show) {

      set((prev) => {

        prev.menu = show !== undefined
          ? show
          : !prev.menu

        return { ...prev }
      })

    },

    toggle_settings(show) {

      set((prev) => {

        prev.settings = show !== undefined
          ? show
          : !prev.settings

        // prev.backdrop = prev.settings
        if (prev.settings) {
          window.api.show_webview()
        } else {
          window.api.show_webview(prev.current_webview?.id)
        }

        return { ...prev }
      })
    },

    backdrop: false,

    setBackdrop(show = false) {

      set({ backdrop: show })

    },

  })
)