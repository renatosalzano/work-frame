import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { UserData } from './store'
import CONST from './constant'

export type Api = {
  minimize_window(): void
  maximize_restore_window(): void
  close_window(): void
}

// Custom APIs for renderer
const api = {
  // config: Config
  minimize_window: () => {
    ipcRenderer.send(CONST.MIN_WINDOW)
  },
  maximize_restore_window: () => {
    ipcRenderer.send(CONST.MAX_RES_WINDOW)
  },
  close_window: () => {
    ipcRenderer.send(CONST.CLOSE_WINDOW)
  }
}

// import { Config } from '../store/config'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  console.log('context now')
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    UserData.expose()
    // contextBridge.exposeInMainWorld('config', Config.preload())

  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api

  UserData.toWindow()
}
