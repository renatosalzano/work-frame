import { FC } from "react";
import './appbar.scss'
import { Button } from "components/input";
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from "react-icons/vsc"
import { HandleChange } from "components/input/types";


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
        >
          <VscChromeMinimize />
        </Button>
        <Button
          variant="icon"
          size="small"
        >
          <VscChromeMaximize />
        </Button>
        <Button
          variant="icon"
          size="small"
          color="error"
        >
          <VscChromeClose />
        </Button>
      </div>
    </div>
  )
}