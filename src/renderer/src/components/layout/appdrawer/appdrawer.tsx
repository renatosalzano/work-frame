import './appdrawer.scss'

import { FC } from "react";
import { Button } from 'components/input';
import { useAppState } from 'store/app';
import { HandleChange } from 'components/input/types';
import { useUserdata } from 'store/userdata';
import { IoSettingsOutline } from "react-icons/io5";
import { VscDiffAdded } from "react-icons/vsc";
import { useTheme } from 'hooks/useTheme';


export const Appdrawer: FC = () => {

  const {
    settings,
    // current_webview,
    set_current_webview,
    toggle_settings
  } = useAppState()

  const current_webview = useUserdata(store => store.current_webview)
  const webview = useUserdata(store => store.webview)

  const show_menu = useAppState(store => store.menu)
  const { get_color } = useTheme()

  // const [open, setOpen] = useState(false)

  const on_click_settings = () => {
    toggle_settings()
  }

  const onChange: HandleChange = (id, name) => {
    set_current_webview(id === 'new-webview'
      ? undefined
      : { id, name })
  }

  return (
    <div
      id="appdrawer"
      className={utils.classname({
        open: show_menu
      })}
      style={{
        // @ts-ignore
        '--border-color': get_color(0.2)
      }}
    >

      <div
        className="scroll-container hide-scrollbar flex flex-column flex-grow"
      >
        {Object.values(webview).map((config, i) => config && (
          <Button
            key={`${config.id}_${i}`}
            id={config.id}
            value={config.name}
            variant='icon'
            size='large'
            active={!!(current_webview && current_webview.id === config.id)}
            onChange={onChange}
          >
            {config.icon ? (
              <img className='config-icon' src={config.icon} />
            ) : config.name}
            {/* {config.name} */}
          </Button>
        ))}

        {settings && (
          <Button
            id='new-webview'
            variant='left-menu'
            size='large'
            active={!current_webview}
            onChange={onChange}
          >
            <VscDiffAdded />
          </Button>
        )
        }

      </div>

      <Button
        variant='left-menu'
        size='large'
        onClick={on_click_settings}
      >
        <IoSettingsOutline
          className={utils.classname('transform', { 'rotate-90': settings })}
        />
      </Button>

      {/* <div className="lower flex">
        <Button
          variant='icon'
          size='large'
          onClick={onclick}
        >
          <IoSettingsOutline
            className={utils.classname('transform', { 'rotate-90': settings })}
          />
        </Button>
      </div> */}
      <div
        className="appdrawer-bg"
        style={{
          backgroundColor: get_color(0.04)
        }}
      />
    </div>
  )
}