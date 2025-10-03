import { FC } from "react";
import './appbar.scss'
import { Button } from "components/input";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc"


export const Appbar: FC = () => {


  return (
    <div id="app-bar">

      <div className="app-bar_title">
        WORK FRAME
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