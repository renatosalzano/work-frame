import { InputColor } from "components/input"
import { FC } from "react"
import { useUserdata } from "store/userdata"


export const Customize: FC = () => {

  const { theme, setTheme } = useUserdata()

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

    setTheme(partial_theme)
  }

  return (
    <div className='flex flex-column'>

      <InputColor
        id='primary'
        value={theme.primary}
        onChange={onChangeColor}
      />

      <InputColor
        id='accent'
        value={theme.accent}
        onChange={onChangeColor}
      />

    </div>
  )
}