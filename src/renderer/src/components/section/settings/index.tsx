
import './settings.scss'
import { FC, useState } from "react";
import { useAppState } from "store/app";
import { Tabsbar } from 'components/layout/tabsbar/tabsbar';
import { Customize } from './customize';
import { WebviewSettings } from './webview';


export const Settings: FC = () => {

  const {
    settings,
    current_webview = 'New Webview'
  } = useAppState()

  const [tab, setTab] = useState('webview')

  const onChangeTab = (tab: string) => {
    setTab(tab)
  }

  return (
    <div
      id='settings'
      className={utils.classname(
        'flex flex-column', {
        show: settings
      })}
    >

      <Tabsbar
        tabs={[
          { label: current_webview, value: 'webview' },
          { label: 'Customize', value: 'customize' }
        ]}
        onChangeTab={onChangeTab}
      />

      {tab === 'webview' && <WebviewSettings />}
      {tab === 'customize' && <Customize />}

    </div>
  )
}
