import { FC } from "react";
import { Settings } from "./settings/index";
import { useAppState } from "store/app";


const Section: FC = () => {

  const current_section = useAppState(state => state.current_section)

  switch (current_section) {
    case 'webview':
      return null
    default:
      return null
  }
}

export {
  Section,
  Settings
}