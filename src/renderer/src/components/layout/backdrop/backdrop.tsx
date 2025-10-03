import './backdrop.scss'
import { useAppState } from "store/app";
import { FC } from "react";
import { useUserdata } from 'store/userdata';


export const Backdrop: FC = () => {

  const { backdrop } = useAppState()
  const theme = useUserdata(state => state.theme)

  return (
    <div
      id="backdrop"
      className={utils.classname({
        show: backdrop
      })}
      style={{
        // @ts-ignore
        '--backdrop-color': `${theme.type === 'dark'
          ? theme.color_dark
          : theme.color_light}d6`
      }}
    />
  )

}