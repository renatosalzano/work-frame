import './colorpicker.scss'
import { createContext, FC, useContext, useEffect, useRef, useState } from "react"
import { ColorPicker } from "./ColorPicker"
import { useUserdata } from 'store/userdata'

type ColorPickerContext = {
  value: string
  close(): void
  onChange(color: string, type: ThemeType): void
}

const Context = createContext({} as ColorPickerContext)

export const usePickerContext = () => useContext(Context)

export type InputColorProps = {
  id: string
  value: string
  onChange(id: string, color: string, type: 'dark' | 'light'): void
}

export const InputColor: FC<InputColorProps> = ({
  id,
  value,
  onChange
}) => {

  const ref = useRef<HTMLDivElement>(null)

  const [showPicker, setShowPicker] = useState(false)
  const theme = useUserdata(store => store.theme)


  useEffect(() => {

    console.log(value, 'is change')

    if (ref.current) {
      ref.current.style.setProperty('--input-color-value', value)
      ref.current.style.setProperty(
        '--input-border-color',
        theme.type === 'dark'
          ? `${theme.color_light}4a`
          : `${theme.color_dark}4a`
      )
    }

  }, [value, theme])

  return (
    <div className="colorpicker">

      <label className='label'>
        {id}
      </label>

      <div
        ref={ref}
        className="color-input"
        onClick={() => setShowPicker(p => !p)}
      />

      <Context.Provider
        value={{
          value,
          onChange(color, type) {
            onChange(id, color, type)
          },
          close() { setShowPicker(false) }
        }}
      >
        <div className="dropdown-anchor">
          {
            showPicker && (
              <ColorPicker
                value={value}
                onChangeColor={(color, type) => onChange(id, color, type)}
                close={() => setShowPicker(false)}
              />
            )
          }
        </div>
      </Context.Provider>
    </div>
  )

}