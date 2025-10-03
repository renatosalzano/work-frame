import { ElectronAPI } from '@electron-toolkit/preload'
import { UserDataStore, Theme as theme, ThemeType as themetype, WebviewConfig } from './store'
import { Store } from 'src/utils/Store'


declare global {

  type Userdata = UserDataStore
  type Theme = theme
  type ThemeType = themetype
  type Webviewconfig = WebviewConfig

  interface Window {
    electron: ElectronAPI
    api: {}
    userdata: Store<UserDataStore>
  }
}
