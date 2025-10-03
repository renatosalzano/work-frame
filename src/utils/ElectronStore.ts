import { app, ipcMain, WebContents } from "electron"
import { existsSync, readFileSync, writeFileSync } from "fs"
import path from "path"
import { Store } from "./Store"


type Obj = Record<string, any>


export class ElectronStore {

  store: Obj
  store_path: string = ''
  ipc_get: string
  ipc_set: string
  ipc_sync: string

  client: WebContents

  constructor(store: Store<any>, webContents: WebContents) {

    this.client = webContents

    this.store = store.store
    this.ipc_get = store.ipc_get
    this.ipc_set = store.ipc_set
    this.ipc_sync = store.ipc_sync

    this.store_path = path.join(app.getPath('userData'), store.store_name)

    console.log(`init electron store: ${store.store_name}`)

    this.init_store_data()

    ipcMain.on(this.ipc_get, (event, key: string) => {
      console.log('ipcMain', this.ipc_get, key)
      event.returnValue = this.get(key);
    });

    ipcMain.on(this.ipc_set, async (_event, partial) => {
      console.log('ipcMain', this.ipc_set, partial)
      this.set(partial);
    });

    ipcMain.on(this.ipc_sync, (event) => {
      event.returnValue = this.store;
      console.log('ipcMain', this.ipc_sync, this.store)
    });

  }


  private init_store_data() {
    try {

      if (existsSync(this.store_path)) {

        console.log(`exist in ${this.store_path}`)

        const file = readFileSync(this.store_path, 'utf-8')
        const data = JSON.parse(file)
        this.store = data

      } else {

        console.log(`write in ${this.store_path}`)

        this.write_store_data()
      }

    } catch (error) {
      console.error(error)
    }
  }


  private write_store_data() {
    const json = JSON.stringify(this.store)
    writeFileSync(this.store_path, json, 'utf-8')
  }


  private get(key?: string) {

    return key
      ? this.store[key]
      : this.store

  }


  private set(partial: Obj) {

    this.store = {
      ...this.store,
      ...partial
    }

    this.write_store_data()

  }

}


