import InputLetter from "./InputLetter";

export default function Word() {
  return (
    <div className="flex justify-center items-center">
      <InputLetter letter='b' isFill={true} isCorrect={0}/>
    </div>
  )
}
