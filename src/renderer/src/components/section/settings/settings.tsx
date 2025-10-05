
import './settings.scss'
import { FC, useEffect, useState } from "react";
import { useAppState } from "store/app";
import { Tabsbar } from 'components/layout/tabsbar/tabsbar';
import { Customize } from './customize';
import { WebviewSettings } from './webview';
import { ImPaintFormat } from "react-icons/im";
import { useUserdata } from 'store/userdata';


export const Settings: FC = () => {

  const {
    settings
  } = useAppState()

  const current_webview = useUserdata(state => state.current_webview)

  const current = current_webview ?? { name: 'New Webview', id: 'new-webview' }

  const [tab, setTab] = useState('webview')

  const onChangeTab = (tab: string) => {
    setTab(tab)
  }

  useEffect(() => {
    // console.log(settings)
    if (!settings) {
      // console.log('do')
      setTab(() => 'webview')
    }
  }, [settings])

  return (
    <div
      id='settings'
      className={utils.classname(
        'flex flex-column', {
        show: settings
      })}
    >

      <Tabsbar
        currentTab={tab}
        tabs={[
          { label: current.name, value: 'webview' },
          { label: <ImPaintFormat />, value: 'customize' }
        ]}
        onChangeTab={onChangeTab}
      />

      {tab === 'webview' && <WebviewSettings key={current.id} />}
      {tab === 'customize' && <Customize />}

    </div>
  )
}
