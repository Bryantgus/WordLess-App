

type KeyProps = {
    wasUsed: boolean,
    Inputkey: string
}

export default function Key({ wasUsed, Inputkey }: KeyProps) {
    return (
        <div className={`uppercase font-bold text-xl flex justify-center items-center bg-white-300 w-[54px] h-[60px] rounded border border-yellow-800 hover:border-blue-500 hover:border-2
        
    `}>
    {Inputkey}
        </div>
    )
}
