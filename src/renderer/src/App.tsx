
import Versions from './components/Versions'
import { Appbar, Appdrawer, Backdrop } from 'components/layout'
import { useConfig } from 'store/config'
import { useThemeUpdater } from 'hooks/useThemeUpdater'

function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  useThemeUpdater()

  // const { background } = useConfig()

  // console.log(window.api.config)

  return (
    <>
      <Appbar />
      <div id='root_app'>
        <Appdrawer />
        <main className='flex-grow flex flex-column relative'>
          <Backdrop />
        </main>
        {/* <webview className='webview' src='https://www.google.com/' /> */}
        {/* <Versions></Versions> */}

      </div>
    </>
  )
}

export default App
