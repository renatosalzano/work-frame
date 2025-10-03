import './tabsbar.scss'
import { FC, ReactNode, useEffect, useState } from "react";

export type TabsbarProps = {
  variant?: 'left' | 'center'
  tabs: { value: string, label: ReactNode, disabled?: boolean }[]
  currentTab?: string
  onChangeTab?(tab: string): void
}

export const Tabsbar: FC<TabsbarProps> = ({
  variant = 'left',
  currentTab,
  tabs,
  onChangeTab
}) => {

  const [active, setActive] = useState(tabs[0].value)

  console.log(active, tabs)

  const handleChangeTab = (tab: string) => {
    setActive(tab)
    onChangeTab && onChangeTab(tab)
  }


  useEffect(() => {
    setActive(tabs[0].value)
  }, [tabs])


  return (
    <nav
      id="tabsbar"
      className={utils.classname({
        [`${variant}-variant`]: !!variant
      })}
    >
      <ul className='flex'>
        {tabs.map((tab, i) => (
          <li
            key={tab.value + i}
            className={
              utils.classname(
                'tab',
                {
                  active: currentTab
                    ? currentTab === tab.value
                    : active === tab.value,
                  disabled: tab.disabled
                }
              )
            }
            onClick={() => handleChangeTab(tab.value)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="divider"></div>
    </nav>
  )
}