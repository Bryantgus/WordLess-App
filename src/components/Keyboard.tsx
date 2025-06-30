import Key from "./Key";
import { KeyPressedContext } from "../hook/KeyPressedContext";
import { useContext } from "react";

const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    ["z", "x", "c", "v", "b", "n", "m"]
];


export default function Keyboard() {
    const letterPressed = useContext(KeyPressedContext)
    const {key, setKey} = letterPressed
    
    return (
        <div className='mt-8 flex flex-col justify-center items-center gap-y-2'>
            <div className='flex justify-center items-center gap-1'>
                {keyboardRows[0].map((item, key) => {
                    return (
                        <Key
                            key={key}
                            Inputkey={item}
                            wasUsed={false}
                        />
                    );
                })}
            </div>
            <div className='flex justify-center items-center gap-1'>
                {keyboardRows[1].map((item, key) => {
                    return (
                        <Key
                            key={key}
                            Inputkey={item}
                            wasUsed={false}
                        />
                    );
                })}
            </div>
            <div className='flex justify-center items-center gap-1'>
                <div 
                    className='w-[80px] cursor-pointer uppercase font-bold text-l flex justify-center items-center bg-white-300 h-[60px] rounded border border-yellow-800 hover:border-blue-500 hover:border-2'
                    onClick={() => {setKey("Enter")}}
                    >
                    Enter
                    </div>
                {keyboardRows[2].map((item, key) => {
                    return (
                        <Key
                            key={key}
                            Inputkey={item}
                            wasUsed={false}
                        />
                    );
                })}
                <div 
                    className='w-[60px] cursor-pointer font-bold flex justify-center items-center bg-white-300 h-[60px] rounded border border-yellow-800 hover:border-blue-500 hover:border-2'
                    onClick={() => {setKey("Backspace")}}
                    >
                    <img src="/delete-key.svg" alt="" />
                </div>
            </div>
        </div>

    )
}
