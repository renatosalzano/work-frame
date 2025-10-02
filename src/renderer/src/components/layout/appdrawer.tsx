import './appdrawer.scss'

import { FC, useState } from "react";
import { Button } from 'input/button'
import { IoSettingsOutline, IoAddCircleOutline } from "react-icons/io5";
import { useAppState } from 'store/app';


export const Appdrawer: FC = () => {

  const { settings, toggleSettings } = useAppState()

  const [open, setOpen] = useState(false)

  const onclick = () => {
    toggleSettings()
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
            variant='icon'
            size='large'
            onClick={onclick}
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