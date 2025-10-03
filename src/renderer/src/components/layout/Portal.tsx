import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode | ReactNode[]
}

export const Portal: FC<PortalProps> = ({
  children
}) => {

  const container = document.querySelector('#root-portal')!

  return createPortal(children, container)

}