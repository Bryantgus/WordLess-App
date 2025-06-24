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
  wordLength: number,
  attemptsLength: number,
  sendingAttemptsToFather: (attempts: AttemptLetter[][]) => void
}

export const AllAttemptsWords = React.memo(
  function ({ wordLength, attemptsLength, sendingAttemptsToFather }: AllAttemptsWords) {

    const [attempts, setAttempts] = useState(
      generateAttempts(wordLength, attemptsLength)
    )

    useEffect(() => {
      const newAttempts = generateAttempts(wordLength, attemptsLength)
      setAttempts(newAttempts)
      sendingAttemptsToFather(newAttempts)
    }, [attemptsLength, wordLength, sendingAttemptsToFather])

    

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
