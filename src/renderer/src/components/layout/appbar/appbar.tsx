import { FC } from "react";
import './appbar.scss'
import { Button } from "components/input";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc"
import { useAppState } from "store/app";
import { MenuIcon } from "./menu";
import { useUserdata } from "store/userdata";

export const Appbar: FC = () => {


  const current_webview = useAppState(state => state.current_webview)

  const { get_webview } = useUserdata.getState()
  const { toggle_menu } = useAppState.getState()

  const { icon } = get_webview(current_webview?.id) ?? {}

  console.log(current_webview, icon)

  return (
    <div id="app-bar">

      <div className="app-bar_menu">
        <Button
          variant="left-menu"
          size="small"
          onClick={() => toggle_menu()}
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="app-bar_title flex-grow">
        {current_webview?.name}
      </div>

      <div className="app-bar_button-container">
        <Button
          variant="icon"
          size="small"
          onClick={window.api.minimize_window}
        >
          <VscChromeMinimize />
        </Button>
        <Button
          variant="icon"
          size="small"
          onClick={window.api.maximize_restore_window}
        >
          <VscChromeMaximize />
        </Button>
        <Button
          variant="icon"
          size="small"
          color="error"
          onClick={window.api.close_window}
        >
          <VscChromeClose />
        </Button>
      </div>
    </div>
  )
}