import type { UseBoundStore, StoreApi } from "zustand"
import type { StoreConfig } from '../../store'
import type { CreateStore } from '../../utils/Store'
import { Classname } from "./components/utils"


interface GlobalUtils {
  classname: Classname
}

declare global {
  const utils: GlobalUtils

  type Config = StoreConfig

  interface Window {
    config: {
      createStore: CreateStore<StoreConfig>
    }
  }
}

export { }