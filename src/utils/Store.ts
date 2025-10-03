import { contextBridge, ipcRenderer, WebContents } from "electron"

type Obj = Record<string, any>

type StoreSetter<T> = (partial: Partial<T> | ((prev: T) => T)) => void
type StoreGetter<T> = {
  (): T
} & {
  <K extends keyof T>(key?: K): T[K]
}

type InitStore<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => T

export type CreateStore<T> = (set: StoreSetter<T>, get: StoreGetter<T>) => T

export class Store<T> {

  init_store: InitStore<T>
  store: Obj = {}

  store_name: string
  ipc_get: string
  ipc_set: string
  ipc_sync: string

  constructor(storeName: string, store: InitStore<T>) {

    this.ipc_get = `${storeName}:get`
    this.ipc_set = `${storeName}:set`
    this.ipc_sync = `${storeName}:sync`

    this.init_store = store
    this.store = store(this.client_set, this.client_get as any) as Obj
    this.store_name = storeName
  }


  async initMain(webContents: WebContents) {

    const Module = await import(/* @vite-ignore */'./ElectronStore')

    new Module.ElectronStore(this as Store<any>, webContents)
  }


  private client_get = (key?: string) => {
    console.log(this.ipc_get, 'get')
    ipcRenderer.sendSync(this.ipc_get, key)
  }


  private client_set = (partial: (Partial<Obj> | ((prev: Obj) => Obj))) => {

    partial = typeof partial === 'function'
      ? partial(this.store)
      : partial

    const payload: Obj = {}

    for (const key in partial) {

      const value = partial[key]

      if (typeof value !== 'function') {
        this.store[key] = value
        payload[key] = value
      }
    }

    ipcRenderer.send(this.ipc_set, payload)
  }


  private client_sync = () => {
    console.log(this.ipc_sync, 'sync')
    const store = ipcRenderer.sendSync(this.ipc_sync) as T

    for (const key in store) {
      this.store[key] = store[key]
    }

    console.log(this.store)
  }


  toWindow() {
    this.client_sync()

    const api = Object.assign(
      {},
      this.store,
      { createStore: this.createStore }
    )

    window[this.store_name] = api

    console.log(`window.${this.store_name}`, api)
  }

  expose = () => {
    this.client_sync()

    const api = Object.assign(
      {},
      this.store,
      { createStore: this.createStore }
    )

    contextBridge.exposeInMainWorld(
      this.store_name,
      api
    )

    console.log(`expose window.${this.store_name}`, api)
  }


  createStore = (set: StoreSetter<T>, get: StoreGetter<T>) => {

    const setter: StoreSetter<T> = (partial) => {
      this.client_set(partial)
      set(partial)
    }

    const store = this.init_store(setter, get)

    for (const key in this.store) {

      const value = this.store[key]

      if (typeof value !== 'function') {
        (store as any)[key] = this.store[key]
      }

    }

    return store

  }
}


