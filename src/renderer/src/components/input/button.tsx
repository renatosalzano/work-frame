import './button.scss'
import { DetailedHTMLProps, FC } from "react";
import * as T from './types'

export type ButtonProps = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'round' | 'icon'
  size?: T.Size
  color?: T.Color
}

export const Button: FC<ButtonProps> = ({
  variant,
  size = 'normal',
  color,
  ...props
}) => {

  return (
    <button
      {...props}
      className={utils.classname('base-button', props.className, {
        [`${variant}-button`]: !!variant,
        [`${color}-color`]: !!color,
        [`size-${size}`]: true,
      })}
    />
  )
}