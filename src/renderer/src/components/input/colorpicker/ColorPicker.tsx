import { Tabsbar } from "components/layout"
import { FC, useEffect, useRef, useState } from "react"
import { HiColorSwatch, HiOutlineHashtag } from "react-icons/hi"
import { IoColorPalette } from "react-icons/io5"
import { MdOutlineBorderColor } from "react-icons/md";

import { usePalette, Color } from "store/palette"
import { useUserdata } from "store/userdata"
import { Textfield } from "../text/textfield"

export type PickerProps = {
  value: string
  close(): void
  onChangeColor(color: string, type: ThemeType): void
}


export const ColorPicker: FC<PickerProps> = ({
  value,
  close,
  onChangeColor,
}) => {

  const ref = useRef<HTMLDivElement>(null)

  const { palette, get_color } = usePalette()

  const [color, setColor] = useState<null | Color>(() => {
    return get_color(value) ?? null
  })

  const [tab, setTab] = useState('hue')

  const disabledShade = !!(color && color.shade === undefined)

  const onchange = (color: Color) => {
    // setTab('hue')
    if (tab === 'hue') {

      setColor(() => color)

      if (color.shade) {
        setTab('shade')
      }
    }

    onChangeColor(color.hue, color.type)
  }



  const on_manual_change = (_id: string, hex: string) => {
    if (/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(hex)) {
      console.log('valid hex', hex)
    }
  }


  useEffect(() => {

    const clickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log('outside click')
        close();
      }
    };

    window.addEventListener('mousedown', clickOutside)

    return () => {
      window.removeEventListener('mousedown', clickOutside)
    }

  }, [])

  return (
    <div
      ref={ref}
      className="dropdown-colorpicker"
    >
      <Tabsbar
        variant='center'
        currentTab={tab}
        onChangeTab={setTab}
        tabs={[
          { label: <HiColorSwatch />, value: 'hue' },
          { label: <IoColorPalette />, value: 'shade', disabled: disabledShade },
          { label: <HiOutlineHashtag />, value: 'hex' }
        ]}
      />

      <div
        className={utils.classname(
          "picker-container",
          { show: tab === 'hue' }
        )}
      >
        <ul
          className="row-picker"
        >
          {palette.map((props) => (
            <Swatch
              {...props}
              key={props.name}
              currentColor={color}
              active={props.hue === value}
              onClick={onchange}
            />
          ))}
        </ul>
      </div>

      <div
        className={utils.classname(
          "picker-container",
          { show: tab === 'shade' }
        )}
      >
        <ul
          className="row-picker"
        >
          {color?.shade?.map((props) => (
            <Swatch
              {...props}
              key={props.name}
              currentColor={color}
              active={props.hue === value}
              onClick={onchange}
            />
          ))}
        </ul>
      </div>

      <div
        className={utils.classname(
          "picker-container",
          { show: tab === 'hex' }
        )}
      >

        <Textfield
          id='#'
          onChange={on_manual_change}
        />

      </div>

    </div>
  )
}

type SwatchProps = Color & {
  currentColor: Color | null
  active: boolean
  onClick(color: Color): void
}

const Swatch: FC<SwatchProps> = ({
  name,
  hue,
  type,
  shade,
  active,
  currentColor,
  onClick
}) => {

  const { get_color } = usePalette()
  const theme = useUserdata(store => store.theme)

  useEffect(() => {

    if (active && currentColor === null) {

      const color = get_color(hue)

      if (color) {
        onClick(color)
      }

    }

  }, [active])

  return (
    <li
      title={`${name} - ${hue}`}
      className={utils.classname(
        'color-picker',
        {
          active: active,
          [type]: true
        }
      )}
      style={{
        background: hue,
        // @ts-ignore
        '--border-color-light': `${theme.color_light}4a`,
        '--border-color-dark': `${theme.color_dark}4a`
      }}
      onClick={() => onClick({ name, hue, shade, type })}
    />
  )
}