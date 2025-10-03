import './appdrawer.scss'

import { FC, useState } from "react";
import { Button } from 'components/input';
import { IoSettingsOutline, IoAddCircleOutline } from "react-icons/io5";
import { useAppState } from 'store/app';
import { HandleChange } from 'components/input/types';


export const Appdrawer: FC = () => {

  const {
    settings,
    set_current_webview,
    toggle_settings
  } = useAppState()

  const [open, setOpen] = useState(false)

  const onclick = () => {
    toggle_settings()
  }

  const onChange: HandleChange = (id) => {
    set_current_webview(id === 'new-webview' ? undefined : id)
  }

  return (
    <div
      id="appdrawer"
      className={utils.classname({ open: settings })}
    >

      <div
        className="scroll-container hide-scrollbar flex flex-column flex-grow"
      >

        {settings && (
          <Button
            id='new-webview'
            variant='icon'
            size='large'
            onClick={onclick}
            onChange={onChange}
          >
            <IoAddCircleOutline />
          </Button>)
        }

      </div>

      <div className="lower">
        <Button
          variant='icon'
          size='large'
          onClick={onclick}
        >
          <IoSettingsOutline
            className={utils.classname('transform', { 'rotate-90': settings })}
          />
        </Button>
      </div>
    </div>
  )
}