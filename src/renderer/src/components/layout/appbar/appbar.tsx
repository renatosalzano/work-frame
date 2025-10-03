import { FC } from "react";
import './appbar.scss'
import { Button } from "components/input";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose, VscMenu } from "react-icons/vsc"
import { useAppState } from "store/app";


export const Appbar: FC = () => {


  const current_webview = useAppState(state => state.current_webview)
  const { toggle_menu } = useAppState.getState()


  return (
    <div id="app-bar">

      <div className="app-bar_menu">
        <Button
          variant="left-menu"
          size="small"
          onClick={() => toggle_menu()}
        >
          <VscMenu className="p-2" />
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