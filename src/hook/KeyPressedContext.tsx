import { createContext } from 'react'

type KeyPressed = {
  key: string,
  setKey: (key: string) => void
}

const initialValue: KeyPressed = {
  key: '',
  setKey: () => {}
}

export const KeyPressedContext = createContext<KeyPressed>(initialValue)
