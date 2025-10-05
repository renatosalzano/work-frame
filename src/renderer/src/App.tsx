
// import Versions from './components/Versions'
import { Appbar, Appdrawer, Backdrop } from 'components/layout'
// import { useConfig } from 'store/config'
import { useThemeUpdater } from 'hooks/useThemeUpdater'
import { Section, Settings } from 'components/section'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { useUserdata } from 'store/userdata'
import { useAppState } from 'store/app'

function App(): React.JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  useThemeUpdater()

  return (
    <>
      <Appbar />
      <div id='root_app'>
        <Appdrawer />
        <Main >
          <Section />
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
  const menu_show = useAppState(store => store.menu)
  const ref = useRef<HTMLElement>(null)

  const on_resize = () => {

    const main = ref.current

    if (main) {
      const { x, y, width, height } = main.getBoundingClientRect()

      const electron_bounds = {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height)
      }

      window.api.set_webview_bounds(electron_bounds)
    }
  }

  useEffect(() => {
    addEventListener('resize', on_resize)
    return () => {
      removeEventListener('resize', on_resize)
    }
  }, [])

  useEffect(() => {
    on_resize()


  }, [menu_show])

  return (
    <main
      ref={ref}
      className='flex-grow flex flex-column relative'
      style={{
        opacity: 1,
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
