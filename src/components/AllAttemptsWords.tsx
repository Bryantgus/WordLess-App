import Attempts from "./Attempts";
import { generateAttempts } from "../utils/logic";
import { useEffect, useState } from "react";
import React from "react";

type AttemptLetter = {
  key: number
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

type AllAttemptsWords = {
  word: string,
  attemptsLength: number,
  sendingAttemptsToFather: (attempts: AttemptLetter[][]) => void
}

export const AllAttemptsWords = React.memo(
  function ({ word, attemptsLength, sendingAttemptsToFather }: AllAttemptsWords) {

    const [attempts, setAttempts] = useState(
      generateAttempts(word.length, attemptsLength)
    )

    useEffect(() => {
      const newAttempts = generateAttempts(word.length, attemptsLength)
      setAttempts(newAttempts)
      sendingAttemptsToFather(newAttempts)
    }, [attemptsLength, word, sendingAttemptsToFather])

    

    return (
      <div className="mt-2 flex flex-col gap-2">
        {attempts.map((item, index) => {
          return (
            <Attempts key={index + 1} word={item} />

          )
        })}

      </div>
    )
  }
)
