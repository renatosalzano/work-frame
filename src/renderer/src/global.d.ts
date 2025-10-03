import { Classname } from "./components/utils"


interface GlobalUtils {
  classname: Classname
}

declare global {
  const utils: GlobalUtils
}

export { }