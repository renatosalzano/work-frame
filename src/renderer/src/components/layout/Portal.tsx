import type { FC, ReactNode } from "react";
import { createPortal } from "react-dom";


export const Portal: FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {

  const container = document.querySelector('#root-portal')!

  return createPortal(children, container)

}