import Key from './key'

const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    ["z", "x", "c", "v", "b", "n", "m"]
];


export default function Keyboard() {
    return (
        <div className='mt-8 flex flex-col justify-center items-center gap-y-2'>
            <div className='flex justify-center items-center gap-1'>
                {keyboardRows[0].map((item, key) => {
                    return (
                        <Key
                            key={key}
                            Inputkey={item}
                            wasUsed={true}
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
                            wasUsed={true}
                        />
                    );
                })}
            </div>
            <div className='flex justify-center items-center gap-1'>
                {keyboardRows[2].map((item, key) => {
                    return (
                        <Key
                            key={key}
                            Inputkey={item}
                            wasUsed={true}
                        />
                    );
                })}
            </div>
        </div>

    )
}
