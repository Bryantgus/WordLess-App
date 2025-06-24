import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useEffect, useState } from "react";
import { generateRandomWord } from "./utils/logic";
import { KeyPressedContext } from "./hook/KeyPressedContext";

export default function App() {

  const [randomWord, setRandomWord] = useState(generateRandomWord(2))
  const [key, setKey] = useState('')
  const [attempsPos, setAttemptsPos] = useState(0)
  const [letterPos, setLetterPos] = useState(0)
  useEffect(() => {

  },[key])


  return (
    <div>
      <Header />
      <AllAttemptsWords wordLength={randomWord.length} attemptsLength={2} sendingAttemptsToFather={()}/>
      <KeyPressedContext.Provider value={{ key, setKey }}>
        <Keyboard />
      </KeyPressedContext.Provider>
    </div>
  )
}
