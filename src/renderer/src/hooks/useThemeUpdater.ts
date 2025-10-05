import { useEffect } from "react"
import { useUserdata } from "store/userdata"


function set(key: string, value: string) {
  document.body.style.setProperty(key, value)
}


export const useThemeUpdater = () => {

  const theme = useUserdata(store => store.theme)
  const current_webview = useUserdata(store => store.current_webview)
  // const show_menu = useAppState(state => state.menu)


  // useEffect(() => {

  //   set('--app-border-radius', show_menu ? '8px' : '0px')

  // }, [show_menu])


  useEffect(() => {

    for (const key in theme) {

      const value = (current_webview?.theme || theme)[key]

      // debugger

      // document.body.style.setProperty(`--test-${key}`, value)

      if (key === 'type') {

        // console.log('change theme type', value)

        let theme_color = theme.color_dark
        let theme_color_contrast = theme.color_light

        if (value === 'dark') {
          theme_color = theme.color_light
          theme_color_contrast = theme.color_dark
        }

        // console.log('--theme-color', theme_color)

        set('--theme-color', theme_color)
        set('--theme-color-contrast', theme_color_contrast)
        set('--theme-color-light', theme.color_light)
        set('--theme-color-dark', theme.color_dark)

      } else {

        set(`--theme-${key}`, value)
      }

    }

    // console.log(document.body.style)

  }, [current_webview, theme])
}