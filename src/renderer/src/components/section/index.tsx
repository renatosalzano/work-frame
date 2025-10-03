import { FC } from "react";
import { Settings } from "./settings/index";
import { useAppState } from "store/app";
import { Webview } from "./webview/webview";


const Section: FC = () => {

  const current_section = useAppState(state => state.current_section)
  const current_webview = useAppState(state => state.current_webview)

  switch (current_section) {
    case 'webview':
      return <Webview id={current_webview?.id} />
    default:
      return null
  }
}

export {
  Section,
  Settings
}