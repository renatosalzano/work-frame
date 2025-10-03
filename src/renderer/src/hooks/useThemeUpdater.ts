import { useEffect } from "react"
import { useUserdata } from "store/userdata"

function set(key: string, value: string) {
  document.body.style.setProperty(key, value)
}

export const useThemeUpdater = () => {

  const theme = useUserdata(store => store.theme)

  useEffect(() => {

    for (const key in theme) {

      const value = theme[key]

      if (key === 'type') {

        let theme_color = theme.color_dark
        let theme_color_contrast = theme.color_light

        if (value === 'dark') {
          theme_color = theme.color_light
          theme_color_contrast = theme.color_dark
        }

        set('--theme-color', theme_color)
        set('--theme-color-contrast', theme_color_contrast)
        set('--theme-color-light', theme.color_light)
        set('--theme-color-dark', theme.color_dark)

      } else {

        set(`--theme-${key}`, value)
      }

    }

  }, [theme])
}