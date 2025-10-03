import mat_colors from 'material-colors-ts'
import { Store } from "../utils/Store"

export type ThemeType = 'light' | 'dark'

export type Theme = {
  type: ThemeType
  primary: string
  accent: string
  success: string
  warning: string
  error: string
  color_light: string
  color_dark: string
}

export type WebviewConfig = {
  name: string
  src: string
  icon?: string
  theme?: Theme
}

export type UserDataStore = {
  theme: Theme
  setTheme(theme: Partial<Theme>): void

  webview: { [key: string]: WebviewConfig }
  setWebview(config: WebviewConfig, action: 'save' | 'delete'): void
}


export const API_KEY = 'userdata'


export const UserData = new Store<UserDataStore>(
  API_KEY,
  (set, get) => ({

    theme: {
      type: 'dark',
      primary: mat_colors.grey[900],
      accent: mat_colors.lightBlue[500],
      success: mat_colors.lightGreen[500],
      warning: mat_colors.amber[500],
      error: mat_colors.red[500],
      color_light: mat_colors.white,
      color_dark: mat_colors.black
    },

    setTheme(theme) {

      set((prev) => ({
        ...prev,
        theme: {
          ...prev.theme,
          ...theme
        }
      }))
    },

    webview: {},

    setWebview(config, action) {

      set((prev) => {

        if (action === 'delete') {
          delete prev.webview[config.name]
        } else {
          prev.webview[config.name] = config
        }

        return { ...prev }
      })

    }

  }))