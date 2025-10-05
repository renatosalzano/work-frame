import { InputColor } from "components/input"
import { FC } from "react"
import { useUserdata } from "store/userdata"


type Props = {
  webview_theme?: Theme
  onChange?(partial_theme: Partial<Theme>): void
}


export const Customize: FC<Props> = ({
  webview_theme,
  onChange
}) => {

  const { theme, set_theme } = useUserdata()

  const onChangeColor = (
    id: string,
    color: string,
    type: ThemeType
  ) => {

    const partial_theme: Partial<Userdata['theme']> = {
      [id]: color
    }

    if (id === 'primary') {
      partial_theme.type = type
    }

    if (onChange) {
      onChange(partial_theme)
    } else {
      set_theme(partial_theme)
    }

  }

  const _data = (webview_theme ?? theme)

  return (
    <div className='flex flex-column'>

      <InputColor
        id='primary'
        value={_data.primary}
        onChange={onChangeColor}
      />

      <InputColor
        id='accent'
        value={_data.accent}
        onChange={onChangeColor}
      />



    </div>
  )
}