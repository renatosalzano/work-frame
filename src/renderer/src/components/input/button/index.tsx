import './button.scss'
import * as T from '../types'
import { DetailedHTMLProps, FC, MouseEventHandler } from "react";
import { useUserdata } from 'store/userdata';
import { useTheme } from 'hooks/useTheme';

type ReactButtonProps = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonProps = Omit<ReactButtonProps, 'onChange'>
  & {
    id?: string
    value?: string
    variant?: 'round' | 'icon' | 'left-menu'
    active?: boolean
    size?: T.Size
    color?: T.Color
    onChange?: T.HandleChange
  }

export const Button: FC<ButtonProps> = ({
  id,
  value = '',
  variant,
  size = 'normal',
  active,
  color,
  onChange,
  children,
  ...props
}) => {

  const { get_color } = useTheme()

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
        active: active
      })}
      style={{
        // @ts-ignore
        '--hover-color': get_color(0.08)
      }}
    >
      {children}
    </button>
  )
}