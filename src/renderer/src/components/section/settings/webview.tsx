import { Button } from "components/input";
import { Textfield } from "components/input/text/textfield";
import { HandleChange } from "components/input/types";
import { FC, useRef, useState } from "react";
import { useAppState } from "store/app";
import { useUserdata } from "store/userdata";
import { IoSave } from "react-icons/io5";

type Props = {

}

export const WebviewSettings: FC = () => {

  const { current_webview = '' } = useAppState()

  const { get_webview } = useUserdata.getState()

  const [config, set_config] = useState<Webviewconfig>(() => {

    const data = get_webview(current_webview) ?? {}

    return {
      name: '',
      src: '',
      ...data
    }
  })

  const onChange: HandleChange = (id, value) => {
    set_config((data) => ({ ...data, [id]: value }))
  }

  return (
    <div className='flex flex-column'>
      <Textfield
        id='name'
        value={config.name}
        onChange={onChange}
      />

      <Textfield
        id='url'
        value={config.src}
        onChange={onChange}
      />

      <div className="button-container m-2 mx-3">
        <Button
          variant="round"
        >
          <IoSave />
        </Button>
      </div>
    </div>
  )
}