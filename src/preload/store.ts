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

export type MenuLeftStyle = 'icon' | 'label' | 'icon-label'

export type AppSettings = {
  menu_left_style: MenuLeftStyle
}


export type WebviewConfig = {
  id: string
  name: string
  src: string
  icon?: string
  theme?: Theme
  protocol?: string
}

export type WebviewData = WebviewConfig & {
  last_modification_time: number
}

export type UserDataStore = {
  theme: Theme
  set_theme(theme: Partial<Theme>): void
  get_theme_color(): string

  current_webview: WebviewConfig | null
  webview: { [key: string]: WebviewData | null }
  get_webview(id?: string): WebviewConfig | void
  set_webview(config: WebviewConfig, action: 'save' | 'delete'): void
  select_webview(id?: string): void
}


export const API_KEY = 'userdata'


export const UserData = new Store<UserDataStore>(
  API_KEY,
  (set, get) => ({

    theme: {
      type: 'dark' as ThemeType,
      primary: mat_colors.grey[900],
      accent: mat_colors.lightBlue[500],
      success: mat_colors.lightGreen[500],
      warning: mat_colors.amber[500],
      error: mat_colors.red[500],
      color_light: '#f7f7f7ff',
      color_dark: '#222222ff'
    },

    set_theme(theme) {

      set((prev) => ({
        ...prev,
        theme: {
          ...prev.theme,
          ...theme
        }
      }))
    },

    get_theme_color() {
      const { theme } = get()

      return theme.type === 'dark'
        ? theme.color_light
        : theme.color_dark
    },

    current_webview: null,

    webview: {},

    select_webview(id) {

      const { get_webview } = get()

      const config = get_webview(id)

      set({ current_webview: config ?? null })

    },

    get_webview(name) {

      const { webview } = get()

      if (name) {
        const config = webview[name]
        if (config) return config
      }

      return
    },

    set_webview(config, action) {

      set((prev) => {

        if (action === 'delete') {
          prev.webview[config.id] = null
        } else {

          const data: WebviewData = {
            ...config,
            last_modification_time: new Date().getTime()
          }

          prev.webview[config.id] = data
          prev.current_webview = {
            ...config
          }
        }

        return { ...prev }
      })

    }

  }))