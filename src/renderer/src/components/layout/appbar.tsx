import { FC } from "react";
import './appbar.scss'


export const Appbar: FC = () => {

  return (
    <div id="app-bar">

      <div className="app-bar_title">
        WORK APP
      </div>

      <div className="app-bar_button-container">
        <button className="btn">-</button>
        <button className="btn">o</button>
        <button className="btn">x</button>
      </div>
    </div>
  )
}