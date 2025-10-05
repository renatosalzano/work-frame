import { useUserdata } from "store/userdata"

export const useTheme = () => {

  const theme = useUserdata(state => state.theme)
  const current_webview = useUserdata(state => state.current_webview)

  const _theme = current_webview?.theme ?? theme

  return {
    _theme,
    ..._theme,
    get_color(opacity: number = 1) {

      if (opacity < 0) opacity = 0
      if (opacity > 1) opacity = 1

      const intValue = Math.round(opacity * 255)


      const hex = intValue.toString(16).toUpperCase().padStart(2, '0')

      const current_color = _theme.type === 'dark'
        ? _theme.color_light
        : _theme.color_dark

      return current_color + hex
    }
  }
}