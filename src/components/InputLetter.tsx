type InputLetterProps = {
  letter: string,
  isFill: boolean,
  isCorrect: number, // 1: Correct, 2: In word wrong pos, 3: Incorrect  
}

export default function InputLetter({ letter, isFill, isCorrect }: InputLetterProps) {
  return (
    <div
      className={`
      ${isFill ? ' border-black' : 'border-gray-400'}
      ${isCorrect === 0 && ' bg-white '}
      ${isCorrect === 1 && ' bg-green-400 '}
      ${isCorrect === 2 && ' bg-amber-200 '}
      ${isCorrect === 2 && ' bg-neutral-500 '}
      h-[7vh] md:w-[6vh] md:h-[6vh] md:max-w-[60px] md:max-h-[60px] border-solid border-2 flex place-items-center text-center justify-center uppercase text-xl rounded font-extrabold
      `}
    >
      {letter}
    </div>
  )
}
