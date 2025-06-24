import { clsx } from "clsx"

type InputLetterProps = {
  letter: string,
  isFill: boolean,
  isCorrect: number, // 1: Correct, 2: In word wrong pos, 3: Incorrect  
  wasAnswer: boolean
}

export default function InputLetter({ letter, isFill, isCorrect, wasAnswer }: InputLetterProps) {

  const classes = clsx(
    {
      "bg-white": isCorrect === 0,
      "bg-green-400 border-green-400": isCorrect === 1,
      "bg-amber-400 border-amber-400": isCorrect === 2,
      "bg-neutral-500 border-neutral-500": isCorrect === 3,
    },
    // Borde adicional si está rellenado (solo si no hay isCorrect significativo)
    {
      "border-gray-400": isFill,
      "border-gray-300": !isFill,
    },
    // Texto blanco si ya fue respondido
    {
      "text-white": wasAnswer,
    },
    // Clases fijas
    "h-[7vh] md:w-[6vh] md:h-[6vh] md:max-w-[60px] md:max-h-[60px]",
    "border-solid border-2 flex place-items-center text-center justify-center",
    "uppercase text-xl rounded font-extrabold"
  );

  return (
    <div
      className={classes}>
      {letter}
    </div>
  )
}
