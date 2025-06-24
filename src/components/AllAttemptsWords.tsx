import Word from "./Word";

export default function AllAttemptsWords() {
  const infoWord = [
    { key: 1, letter: "b", isFill: true, isCorrect: 1, wasAnswer: true },
    { key: 2, letter: "a", isFill: true, isCorrect: 0, wasAnswer: false },
    { key: 3, letter: "a", isFill: true, isCorrect: 2, wasAnswer: false },
    { key: 4, letter: "a", isFill: true, isCorrect: 2, wasAnswer: false },
    { key: 5, letter: "", isFill: false, isCorrect: 0, wasAnswer: false },

  ]


  return (
    <div className="mt-12 flex flex-col gap-2">
      <Word word={infoWord} />
      <Word word={infoWord} />
      <Word word={infoWord} />
      <Word word={infoWord} />
      <Word word={infoWord} />
      <Word word={infoWord} />
    </div>
  )
}
