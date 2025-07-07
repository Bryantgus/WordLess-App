import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useEffect, useRef, useState } from "react";
import { generateAttempts, generateRandomWord } from "./utils/logic";
import { KeyPressedContext } from "./hook/KeyPressedContext";

const LENGTH_RANDOM_WORD = 6
const LENGTH_ATTEMPTS = 6
type AttemptLetter = {
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

export default function App() {

  const [key, setKey] = useState<string>('') //Global State listen onClick on key component
  const [randomWord, setRandomWord] = useState<string>(generateRandomWord(LENGTH_RANDOM_WORD).toUpperCase())
  const [attemptsLength, setAttemptsLength] = useState(LENGTH_ATTEMPTS)
  const [attempts, setAttempts] = useState<AttemptLetter[][]>([])
  const [attemptsPos, setAttemptsPos] = useState<number>(0)
  const PrevAttemptPos = useRef<number>(0)
  const [myWord, setMyWord] = useState<string[]>([])

  useEffect(() => {
    console.log(randomWord);
  }, [randomWord]);

  //Generate Attempts
  useEffect(() => {
    setAttempts(generateAttempts(randomWord.length, attemptsLength))
  }, [attemptsLength, randomWord.length]);

  //Listening keyBoyard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyPressed = e.key
      if (/^[a-zA-Z]$/.test(keyPressed)) {
        setKey(keyPressed.toUpperCase())
      } else if (keyPressed === 'Enter' || keyPressed === 'Backspace') {
        setKey(keyPressed)
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //Setting myWord
  useEffect(() => {
    if (myWord.length >= randomWord.length) return
    if (key === '') return
    if (key === 'Backspace') {
      setMyWord(prev => prev.slice(0, -1))
    } else if (key === 'Enter') {
      console.log("Enter");

    } else if (/[a-zA-Z]/.test(key)) {
      setMyWord(prev => [...prev, key])
      console.log(key);

    }
    setKey('')
  }, [key, myWord.length, randomWord.length]);

  useEffect(() => {
    console.log(myWord);

    setAttempts(prev => {
      const newAttempts = [...prev]
      const modifyAttempt = myWord.map((letter: string) => {
        return {
          letter: letter,
          isFill: true,
          isCorrect: 3,
          wasAnswer: true
        }
      })
      while (modifyAttempt.length !== LENGTH_RANDOM_WORD) {
        modifyAttempt.push({
          letter: '',
          isFill: false,
          isCorrect: 0,
          wasAnswer: false
        })
      }
      newAttempts[attemptsPos] = modifyAttempt
      // console.log(newAttempts);
      
      return newAttempts
    })
  }, [attemptsPos, myWord]);

  useEffect(() => {
    console.log(attempts, "attempts");

  }, [attempts, myWord]);
  return (
    <div>
      <Header />

      <AllAttemptsWords attempts={attempts} />

      {/*Set Key By Button*/}
      <KeyPressedContext.Provider value={{ key, setKey }}>
        <Keyboard />
      </KeyPressedContext.Provider>
    </div>
  )
}
