import './button.scss'
import * as T from '../types'
import { DetailedHTMLProps, FC } from "react";
import { useUserdata } from 'store/userdata';

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

  const theme = useUserdata(store => store.theme)

  return (
    <button
      {...props}
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