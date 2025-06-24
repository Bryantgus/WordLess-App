import InputLetter from "./InputLetter";

type infoLetter = {
  key: number,
  letter: string,
  isFill: boolean,
  isCorrect: number,
  wasAnswer: boolean
}

type Word = {
  word: infoLetter[]
}
export default function Word({ word }: Word) {


  return (

    <div className="flex justify-center items-center gap-1.5">
      {word.map((infoLetter: infoLetter) => {
        const { key, letter, isFill, isCorrect, wasAnswer } = infoLetter
        return (
        <InputLetter
          key={key}
          letter={letter}
          isFill={isFill}
          isCorrect={isCorrect}
          wasAnswer={wasAnswer}
        />
        )
      })}


    </div>
  )
}
