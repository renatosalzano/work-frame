import { useTheme } from "hooks/useTheme"
import { FC } from "react"
import { useAppState } from "store/app"

export const MenuIcon: FC = () => {

  const open = useAppState(state => state.menu)
  const { get_color } = useTheme()

  return (
    <div
      className={utils.classname("menu-icon", { open })}
      style={{
        // @ts-ignore
        '--menu-color': get_color(0.8)
      }}
    >
      <div className="icon-bar top"></div>
      <div className="icon-bar center"></div>
      <div className="icon-bar bottom"></div>
    </div>
  )
}