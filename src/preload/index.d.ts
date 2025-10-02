import { ElectronAPI } from '@electron-toolkit/preload'

declare global {

  interface AppConfig {
    background: string
    setBackground(background: string): void
  }

  type useStore<T> = () => T

  interface Window {
    electron: ElectronAPI
    api: {
      config: AppConfig & { useStore: useStore<AppConfig> }
    }
  }
}
