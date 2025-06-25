import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useCallback, useEffect, useState } from "react";
import { generateRandomWord } from "./utils/logic";
import { KeyPressedContext } from "./hook/KeyPressedContext";

type AttemptLetter = {
  key: number
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

export default function App() {

  const [key, setKey] = useState<string>('') //Global State listen onClick on key component
  const [myWord, setMyWord] = useState<string>('')
  const [randomWord, setRandomWord] = useState<string>(generateRandomWord(2))
  const [attemptsLength, setAttemptsLength] = useState(6)
  const [attempts, setAttempts] = useState<AttemptLetter[][]>()
  const [attempsPos, setAttemptsPos] = useState<number>(0)
  const [letterPos, setLetterPos] = useState<number>(0)



  const handleAttempts = useCallback((attemptsData: AttemptLetter[][]) => {
    setAttempts(attemptsData);
    console.log("Intentos recibidos:", attemptsData);
  }, []);

  useEffect(() => {

    setMyWord(prev => {
      if (prev.length < randomWord.length) {
        return prev + key
      } else {
        return prev
      }
    })
    setKey('')
  }, [key, randomWord.length])




  useEffect(() => {
    console.log(myWord, "word");
  }, [myWord])

  return (
    <div>
      <Header />
      <AllAttemptsWords word={randomWord} attemptsLength={attemptsLength} sendingAttemptsToFather={handleAttempts} />
      <KeyPressedContext.Provider value={{ key, setKey }}>
        <Keyboard />
      </KeyPressedContext.Provider>
    </div>
  )
}
