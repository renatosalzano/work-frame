import { useEffect } from "react"
import { useConfig } from "store/config"

export const useThemeUpdater = () => {

  const { theme } = useConfig()

  useEffect(() => {

    for (const key in theme) {
      document.body.style.setProperty(`--theme-${key}`, theme[key])
    }

  }, [theme])
}