import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useEffect, useRef, useState } from "react";
import { generateAttempts, generateRandomWord, replaceOneWithSpace } from "./utils/logic";
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
  const prevAttemptPos = useRef<number>(0)
  const [myWord, setMyWord] = useState<string[]>([])
  const [gameOver, setGameOver] = useState<boolean>(false)

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
    if (gameOver) return 
    if (key === '') return
    if (key === 'Backspace') {
      setMyWord(prev => prev.slice(0, -1))
    } else if (key === 'Enter') {

      if (myWord.length === randomWord.length && prevAttemptPos.current < LENGTH_ATTEMPTS - 1) {
        setAttemptsPos(prev => prev + 1)
        setKey('')
      }

    } else if (/[a-zA-Z]/.test(key)) {
      if (myWord.length === randomWord.length) return
      setMyWord(prev => [...prev, key])
      console.log(key);

    }
    setKey('')
  }, [gameOver, key, myWord.length, randomWord.length]);

  useEffect(() => {
    
    setAttempts(prev => {
      const newAttempts = [...prev]
      let counterCorrect = 0
      //Evaluating past attempt
      if (attemptsPos !== prevAttemptPos.current) {
        let wordToEvaluate = randomWord.split('')
        const modifyAttempt = myWord.map((letter, index) => {
          let letterEvaluate: AttemptLetter = {
            letter: "",
            isFill: false,
            isCorrect: 0,
            wasAnswer: false
          }
          //correct letter and corrent position
          if (letter === wordToEvaluate[index]) {
            letterEvaluate =  {
              letter: letter,
              isFill: true,
              isCorrect: 1,
              wasAnswer: true
            }
            counterCorrect += 1

            //correct letter and wrong position
          } else if (wordToEvaluate.includes(letter)) {
            letterEvaluate = {
              letter: letter,
              isFill: true,
              isCorrect: 2,
              wasAnswer: true
            }
            //wrong both
          } else {
            letterEvaluate = {
              letter: letter,
              isFill: true,
              isCorrect: 3,
              wasAnswer: true
            }
          }
          //Quiting the letter evaluate
          wordToEvaluate = replaceOneWithSpace(wordToEvaluate, letter)
          return letterEvaluate
        })
        

        newAttempts[attemptsPos - 1] = modifyAttempt
        prevAttemptPos.current += 1
        setMyWord([])
        //Modifing the current attempt
      } else {
        //Modifing current attempt
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
      }
      
      if (counterCorrect === randomWord.length) {
        setGameOver(true)
      }
      return newAttempts
    })
  }, [attemptsPos, myWord, randomWord]);

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
