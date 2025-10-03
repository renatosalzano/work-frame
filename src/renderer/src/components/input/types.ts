
export type Size = 'small' | 'normal' | 'large'
export type Color = 'primary' | 'accent' | 'warning' | 'error' | 'success'

export type HandleChange = (id: string, value: string) => void

export type Input = {
  id: string
  value?: string
  label?: string
  size?: Size
  color?: Color
  disabled?: boolean
  onChange(id: string, value: string): void
}