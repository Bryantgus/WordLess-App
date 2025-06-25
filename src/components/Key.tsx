import { useContext } from "react"
import { KeyPressedContext } from "../hook/KeyPressedContext"

type KeyProps = {
    wasUsed: boolean,
    Inputkey: string
}



export default function Key({ wasUsed, Inputkey }: KeyProps) {
    const letterPressed = useContext(KeyPressedContext)
    const { key, setKey } = letterPressed
    return (
        <button
            onClick={(e) => setKey(e.currentTarget.textContent!)}
            className={`cursor-pointer uppercase font-bold text-xl flex justify-center items-center bg-white-300 w-[54px] h-[60px] rounded border border-yellow-800 hover:border-blue-500 hover:border-2
                        ${wasUsed && ' bg-gray-200'}
    `}>
    {Inputkey}
        </button>
    )
}
