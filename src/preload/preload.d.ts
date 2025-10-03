import { ElectronAPI } from '@electron-toolkit/preload'
import { UserDataStore, Theme as theme, ThemeType as themetype } from './store'
import { Store } from 'src/utils/Store'


declare global {

  type Userdata = UserDataStore
  type Theme = theme
  type ThemeType = themetype

  interface Window {
    electron: ElectronAPI
    api: {}
    userdata: Store<UserDataStore>
  }
}
