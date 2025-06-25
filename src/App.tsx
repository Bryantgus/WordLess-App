import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateRandomWord, removeLastWord } from "./utils/logic";
import { KeyPressedContext } from "./hook/KeyPressedContext";
import { AttemptsContext } from "./hook/AttemptsContext";

type AttemptLetter = {
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

export default function App() {

  const [key, setKey] = useState<string>('') //Global State listen onClick on key component
  const [randomWord, setRandomWord] = useState<string>(generateRandomWord(6))
  const [attemptsLength, setAttemptsLength] = useState(6)
  const [attempts, setAttempts] = useState<AttemptLetter[][]>([])
  const [attempsPos, setAttemptsPos] = useState<number>(0)
  const [myWord, setMyWord] = useState<string>('')
  const prevMyWord = useRef<string>('')


  //Modifying keyPressed(button)
  useEffect(() => {
    if (key === 'del') {
      setMyWord(prev => removeLastWord(prev))
    } else if (key === 'submit') {
      console.log("submit");
    } else {
      setMyWord(prev => {
        if (prev.length < randomWord.length) {
          prevMyWord.current = prev
          return prev + key
        } else {
          return prev
        }
      }) 
    }

    setKey('')

  }, [key, randomWord.length])

  //Modifying current attempt
  useEffect(() => {
    const letterIndex = myWord.length - 1
    const deleted = myWord.length < prevMyWord.current.length
    // if (letterIndex === -1) {
    //   letterIndex = 0
    // }

    setAttempts(prev => {
      //All attempts
      const allAttempts = [...prev]
      console.log(allAttempts);


      //Current attempt
      const currentAttemptToModify = [...allAttempts[attempsPos]]

      let currentLetterToModify: AttemptLetter

      //Modifying properties of letter
      if (!deleted) {
        currentLetterToModify = { ...currentAttemptToModify[letterIndex] }
        currentLetterToModify.letter = myWord.charAt(letterIndex)
        currentLetterToModify.isFill = true
      } else {
        currentLetterToModify = { ...currentAttemptToModify[letterIndex + 1] }
        currentLetterToModify.letter = ''
        currentLetterToModify.isFill = false
      }

      //Modifying current attempts with the new changes on letter
      currentAttemptToModify[deleted ? letterIndex + 1 : letterIndex] = currentLetterToModify

      //Pushing the attempt modified into its position
      allAttempts[attempsPos] = currentAttemptToModify

      return allAttempts
    })
    prevMyWord.current = myWord

  }, [myWord ,randomWord.length, attempsPos])

  return (
    <div>
      <Header />
      <AttemptsContext.Provider value={{ attempts, setAttempts }}>
        <AllAttemptsWords word={randomWord} attemptsLength={attemptsLength} />
      </AttemptsContext.Provider>
      <KeyPressedContext.Provider value={{ key, setKey }}>
        <Keyboard />
      </KeyPressedContext.Provider>
    </div>
  )
}
