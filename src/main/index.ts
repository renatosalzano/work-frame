import { app, ipcMain, BaseWindow, WebContentsView, Rectangle } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { UserData } from '../preload/store'
import channel from '../preload/ipc_channel'


const webviews_map = new Map<string, WebContentsView>()
const webview_state = {
  current: '',

}

async function createWindow() {

  const default_bounds = {
    x: 0,
    y: 0,
    width: 900,
    height: 670,
  }

  const user_data = await UserData.init_main()

  const main = new BaseWindow({
    width: default_bounds.width,
    height: default_bounds.height,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {})
  })


  ipcMain.on(channel.min_window, () => {
    main.minimize();
  });


  ipcMain.on(channel.max_res_window, () => {
    if (main.isMaximized()) {
      main.restore();
    } else {
      main.maximize();
    }
  });


  ipcMain.on(channel.close_window, () => {
    main.close();
  });


  const viteapp = new WebContentsView({
    webPreferences: {
      preload: join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  })

  viteapp.setBounds(default_bounds)

  main.contentView.addChildView(viteapp)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    viteapp.webContents.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    viteapp.webContents.loadFile(join(__dirname, '../renderer/index.html'))
  }

  viteapp.webContents.once('did-finish-load', () => {
    main.showInactive();
    viteapp.webContents.openDevTools()
  });

  main.on('resize', () => {
    const { width, height } = main.getBounds();
    viteapp.setBounds({ x: 0, y: 0, width, height });
  })




  // const app_creation_time = new Date().getTime()

  user_data.on('webview', (webviews) => {

    for (const [key, config] of Object.entries(webviews)) {

      if (config) {
        // create / edit
        const {
          id,
          src,
          protocol = 'https://',
        } = config

        if (!webviews_map.has(id)) {

          // create

          const url = `${protocol}${src}`

          const webview = new WebContentsView({
            webPreferences: {

              nodeIntegration: false,
              contextIsolation: true,
              partition: `persist:${id}`
            }
          })

          webview.webContents.loadURL(url)

          // main.contentView.addChildView(webview)

          webviews_map.set(id, webview)

        }


      } else {
        // remove
      }



      console.log('WEBVIEW', key, config)
    }
  })


  ipcMain.on(channel.set_webview_bounds, (_evt, bounds: Rectangle) => {

    for (const webview of webviews_map.values()) {
      webview.setBounds(bounds)
    }

  })


  ipcMain.on(channel.show_webview, (_evt, id?: string) => {

    if (webview_state.current) {

      const webview_current = webviews_map.get(webview_state.current)

      if (webview_current) {
        main.contentView.removeChildView(webview_current)
      }

      webview_state.current = ''
    }

    if (id === undefined) return

    const webview = webviews_map.get(id)

    if (webview) {

      webview_state.current = id
      main.contentView.addChildView(webview)

    }

  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  await createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BaseWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
