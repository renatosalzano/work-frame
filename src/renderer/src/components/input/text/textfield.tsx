import './textfield.scss'
import { ChangeEventHandler, FC, ReactNode, useState } from "react";
import { Input } from '../types'


export type TextfieldProps = Input & {
  children?: ReactNode
}


export const Textfield: FC<TextfieldProps> = ({
  id,
  value,
  label,
  color,
  size = 'normal',
  children = null,
  disabled = false,
  onChange
}) => {

  const [_value, set_value] = useState(value)
  const [_active, set_active] = useState(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = evt.target.value
    set_value(value)
    onChange(id, value)
  }

  return (
    <div
      className={utils.classname('text-field', {
        // [`${variant}-button`]: !!variant,
        [`color-${color}`]: !!color,
        [`size-${size}`]: true,
        active: _active,
        disabled
      })}

    >
      <label
        className='text-field-label'
        htmlFor={id}
      >
        {label ?? id}
      </label>
      <input
        id={id}
        value={_value}
        onChange={handleChange}
        onFocus={() => set_active(true)}
        onBlur={() => set_active(false)}
        list={`${id}-suggestions`}
      />
      {children}
    </div>
  )
}