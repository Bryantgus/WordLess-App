import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateAttempts, generateRandomWord, removeLastWord } from "./utils/logic";
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
  const [randomWord, setRandomWord] = useState<string>(generateRandomWord(6).toUpperCase())
  const [attemptsLength, setAttemptsLength] = useState(6)
  const [attempts, setAttempts] = useState<AttemptLetter[][]>([])
  const [attemptsPos, setAttemptsPos] = useState<number>(0)
  const PrevAttemptPos = useRef<number>(0)
  const [myWord, setMyWord] = useState<string>('')
  const prevMyWord = useRef<string>('')

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

  //Modifying keyPressed(button)
  useEffect(() => {

    if (key === 'Backspace') {
      setMyWord(prev => removeLastWord(prev))
    } else if (key === 'Enter') {

      if (prevMyWord.current.length !== randomWord.length) return

      setAttempts(prev => {
        const currentAttempts = [...prev]
        console.log(currentAttempts);

        const attempModify: AttemptLetter[] = []
        const myWordSplited: string[] = prevMyWord.current.split('')
        const randomWordSplited: string[] = randomWord.split('')

        myWordSplited.forEach((letter, index) => {
          // console.log(randomWordSplited, 'random');
          // console.log(myWordSplited, 'word');
          // console.log(randomWordSplited.includes(letter))
          // console.log(myWordSplited, myWordSplited);
          // console.log(index);

          // console.log(letter, randomWord[index]);

          if (randomWordSplited.includes(letter)) {
            if (myWordSplited[index] === randomWordSplited[index]) {
              // console.log(1);
              attempModify[index] = {
                isCorrect: 1,
                isFill: false,
                wasAnswer: true,
                letter: letter
              }
            } else {
              // console.log(2);
              attempModify[index] = {
                isCorrect: 2,
                isFill: false,
                wasAnswer: true,
                letter: letter
              }
            }
          }
          else {
            // console.log(3);
            attempModify[index] = {
              isCorrect: 3,
              isFill: false,
              wasAnswer: true,
              letter: letter
            }
          }
          //Removing letter of the array
          randomWordSplited[randomWordSplited.indexOf(letter)] = ' '
          // console.log(attempModify);

        });
        currentAttempts[attemptsPos] = attempModify
        return currentAttempts
      })

      setMyWord('')

    } else if (/[a-zA-Z]/.test(key)) {
      setMyWord(prev => {
        if (prev.length < randomWord.length) {
          prevMyWord.current = prev + key.toUpperCase()
          return prev + key.toUpperCase()
        } else {
          return prev
        }
      })
    }
    setKey('')
  }, [attemptsPos, key, randomWord])

  // //Modifying current attempt
  useEffect(() => {

    if (attemptsPos !== PrevAttemptPos.current) return


    const letterIndex = myWord.length - 1
    console.log(letterIndex, "Index");

    const deleted = myWord.length < prevMyWord.current.length
    console.log(deleted);

    setAttempts(prev => {

      //All attempts
      const allAttempts = [...prev]

      //Current attempt
      const currentAttemptToModify = [...allAttempts[attemptsPos]]
      // if (!currentAttemptToModify[letterIndex]) return allAttempts;

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
      allAttempts[attemptsPos] = currentAttemptToModify

      return allAttempts
    })

    prevMyWord.current = myWord

  }, [myWord, randomWord.length, attemptsPos])

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
