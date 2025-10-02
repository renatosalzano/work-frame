
import { Store } from "../utils/Store"
import { grey, lightGreen, lightBlue, red, amber } from 'material-colors-ts'

export type Theme = {
  primary: string
  accent: string
  success: string
  warning: string
  error: string
}

export type StoreConfig = {
  theme: Theme
  background: string
  setBackground(background: string): void
}

export const Config = new Store<StoreConfig>(
  "config",
  (set, get) => ({

    theme: {
      primary: grey[900],
      accent: lightBlue[500],
      success: lightGreen[500],
      warning: amber[500],
      error: red[500],
    },

    background: '#fff',

    setBackground(background: string) {
      set({ background })
    }

  }))


