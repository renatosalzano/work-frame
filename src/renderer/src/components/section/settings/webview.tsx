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

  const { current_webview } = useAppState()

  const { get_webview, set_webview } = useUserdata.getState()

  const [config, set_config] = useState<Webviewconfig>(() => {

    const data = get_webview(current_webview?.id) ?? {}

    return {
      id: '',
      name: '',
      src: '',
      ...data
    }
  })

  const onChange: HandleChange = (id, value) => {
    set_config((data) => ({ ...data, [id]: value }))
  }


  const save = () => {

    console.log(config)

    set_webview({
      id: config.name.replace(/\s/g, ''),
      name: config.name.trim(),
      src: config.src
    }, 'save')

  }


  return (
    <div className='flex flex-column'>
      <Textfield
        id='name'
        value={config.name}
        onChange={onChange}
      />

      <Textfield
        label="url"
        id='src'
        value={config.src}
        onChange={onChange}
      >
        {/* https:// */}
        <datalist id='src-suggestions'>
          <option value="mail.google.com/"></option>
          <option value="outlook.office.com/mail/"></option>
          <option value="mail.yahoo.com/"></option>
          <option value="www.icloud.com/mail/"></option>
        </datalist>
      </Textfield>

      <div className="button-container m-2 mx-3">
        <Button
          variant="round"
          onClick={save}
          disabled={!config.name || !config.src}
        >
          <IoSave />
        </Button>
      </div>
    </div>
  )
}