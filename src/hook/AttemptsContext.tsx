import { createContext } from 'react'

type AttemptLetter = {
  key: number
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

type AttemptsContextType = {
  attempts: AttemptLetter[][],
  setKey: (rowIndex: number, letterIndex: number, letter: string) => void
}


export const AttemptsContext = createContext<AttemptsContextType | null>(null)
