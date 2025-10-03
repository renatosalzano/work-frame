import { ChangeEventHandler, FC, useState } from "react";
import { Input } from '../types'
import { input_classname } from "../common";


export type TextfieldProps = Input & {

}


export const Textfield: FC<TextfieldProps> = ({
  id,
  value,
  label,
  color,
  size = 'normal',
  disabled
}) => {

  const [_value, set_value] = useState(value)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const value = evt.target.value
    set_value(value)
  }

  return (
    <div
      className={input_classname`text-field`({
        color,
        size,
      })}

    >
      <label htmlFor={id}>
        {label ?? id}
      </label>
      <input
        id={id}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}