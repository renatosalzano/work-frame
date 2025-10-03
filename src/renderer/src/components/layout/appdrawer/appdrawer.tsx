import './appdrawer.scss'

import { FC, useState } from "react";
import { Button } from 'components/input';
import { useAppState } from 'store/app';
import { HandleChange } from 'components/input/types';
import { useUserdata } from 'store/userdata';
import { IoSettingsOutline, IoAddCircleOutline } from "react-icons/io5";
import { CgAddR } from "react-icons/cg";


export const Appdrawer: FC = () => {

  const {
    settings,
    set_current_webview,
    toggle_settings
  } = useAppState()

  const webview = useUserdata(store => store.webview)

  const [open, setOpen] = useState(false)

  const onclick = () => {
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
      className={utils.classname({ open: settings })}
    >

      <div
        className="scroll-container hide-scrollbar flex flex-column flex-grow"
      >
        {Object.values(webview).map((config, i) => (
          <Button
            key={`${config.id}_${i}`}
            id={config.id}
            value={config.name}
            variant='icon'
            size='large'
            onChange={onChange}
          >
            {config.name}
          </Button>
        ))}

        {settings && (
          <Button
            id='new-webview'
            variant='icon'
            size='large'
            onChange={onChange}
          >
            <CgAddR />
          </Button>
        )
        }

      </div>

      <Button
        variant='icon'
        size='large'
        onClick={onclick}
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
    </div>
  )
}