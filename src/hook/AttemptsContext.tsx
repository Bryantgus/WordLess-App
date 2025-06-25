import { createContext } from 'react'

type AttemptLetter = {
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

type AttemptsContextType = {
  attempts: AttemptLetter[][] | null,
  setAttempts: (newAttempts: AttemptLetter[][]) => void
}

export const AttemptsContext = createContext<AttemptsContextType | null>(null)
