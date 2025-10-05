import { contextBridge, ipcRenderer, Rectangle } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'
import { UserData } from './store'
import channel from './ipc_channel'

// export type Api = {
//   minimize_window(): void
//   maximize_restore_window(): void
//   close_window(): void
//   show_webview(id?: WebviewConfig): void
//   set_webview_bounds(bounds: Electron.Rectangle): void
// }

// Custom APIs for renderer
const api = {
  minimize_window: () => {
    ipcRenderer.send(channel.min_window)
  },
  maximize_restore_window: () => {
    ipcRenderer.send(channel.max_res_window)
  },
  close_window: () => {
    ipcRenderer.send(channel.close_window)
  },
  show_webview: (id?: string) => {
    ipcRenderer.send(channel.show_webview, id)
  },
  set_webview_bounds: (bounds: Rectangle) => {
    ipcRenderer.send(channel.set_webview_bounds, bounds)
  },
  set_transparency: (transparency?: boolean) => {
    ipcRenderer.send(channel.set_transparency, transparency)
  }
}

export type Api = typeof api

// import { Config } from '../store/config'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  console.log('context used')
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
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
