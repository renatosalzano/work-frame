
// import Versions from './components/Versions'
import { Appbar, Appdrawer, Backdrop } from 'components/layout'
// import { useConfig } from 'store/config'
import { useThemeUpdater } from 'hooks/useThemeUpdater'
import { Settings } from 'components/section'
import { FC, ReactNode } from 'react'
import { useUserdata } from 'store/userdata'

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
        <Main >
          <Settings />
          <Backdrop />
        </Main>
        {/* <webview className='webview' src='https://www.google.com/' /> */}
        {/* <Versions></Versions> */}

      </div>
    </>
  )
}


const Main: FC<{ children: ReactNode }> = ({ children }) => {

  const theme = useUserdata(store => store.theme)

  return (
    <main
      className='flex-grow flex flex-column relative'
      style={{
        backgroundColor: `${theme.type === 'light'
          ? theme.color_dark
          : theme.color_light}0d`
      }}
    >
      {children}
    </main>
  )
}


export default App
