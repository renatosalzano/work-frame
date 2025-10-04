import { ipcMain, WebContentsView } from "electron"
import { WebviewConfig } from '../preload/store'


const createWebview = (config: WebviewConfig) => {

  const view = new WebContentsView({
    webPreferences: {
      // preload: join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      partition: `persist:${config.id}`
    }
  })
}

