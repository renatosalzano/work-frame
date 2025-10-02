import './backdrop.scss'
import { useAppState } from "@renderer/store/app";
import { FC } from "react";

export const Backdrop: FC = () => {

  const { backdrop } = useAppState()

  return (
    <div
      id="backdrop"
      className={utils.classname({
        show: backdrop
      })}
    />
  )

}