import './button.scss'
import * as T from '../types'
import { DetailedHTMLProps, FC, MouseEventHandler } from "react";
import { useUserdata } from 'store/userdata';

type ReactButtonProps = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonProps = Omit<ReactButtonProps, 'onChange'>
  & {
    id?: string
    value?: string
    variant?: 'round' | 'icon'
    size?: T.Size
    color?: T.Color
    onChange?: T.HandleChange
  }

export const Button: FC<ButtonProps> = ({
  id,
  value = '',
  variant,
  size = 'normal',
  color,
  onChange,
  ...props
}) => {

  const theme = useUserdata(store => store.theme)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (evt) => {

    if (id && onChange) {
      onChange(id, value)
    }

    props.onClick && props.onClick(evt)
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={utils.classname('base-button', props.className, {
        [`${variant}-button`]: !!variant,
        [`color-${color}`]: !!color,
        [`size-${size}`]: true,
      })}
      style={{
        // @ts-ignore
        '--hover-color': `${theme.type === 'dark'
          ? theme.color_light
          : theme.color_dark}0d`
      }}
    />
  )
}