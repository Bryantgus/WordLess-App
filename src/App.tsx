import { Header } from "./components/Header";
import { AllAttemptsWords } from "./components/AllAttemptsWords";
import Keyboard from "./components/Keyboard";
import { useEffect, useRef, useState } from "react";
import { generateAttempts, generateRandomWord, replaceOneWithSpace } from "./utils/logic";
import { KeyPressedContext } from "./hook/KeyPressedContext";
import GameOverModal from "./components/GameOverModel";


const LENGTH_RANDOM_WORD = Math.floor(Math.random() * (7 - 4 + 1)) + 4
const LENGTH_ATTEMPTS = Math.floor(Math.random() * (7 - 5 + 1)) + 5;

type AttemptLetter = {
  letter: string;
  isFill: boolean;
  isCorrect: number;
  wasAnswer: boolean;
};

export default function App() {

  const [key, setKey] = useState<string>(""); //Global State listen onClick on key component
  const [randomWord, setRandomWord] = useState<string>(
    generateRandomWord(LENGTH_RANDOM_WORD)
  );
  const [attemptsLength, setAttemptsLength] = useState(LENGTH_ATTEMPTS);
  const [attempts, setAttempts] = useState<AttemptLetter[][]>([]);
  const [attemptsPos, setAttemptsPos] = useState<number>(0);
  const prevAttemptPos = useRef<number>(0);
  const [myWord, setMyWord] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    console.log(randomWord);
  }, [randomWord]);

  // Generate Attempts
  useEffect(() => {
    setAttempts(generateAttempts(randomWord.length, attemptsLength));
  }, [attemptsLength, randomWord.length]);

  // Listening to physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyPressed = e.key;
      if (/^[a-zA-Z]$/.test(keyPressed)) {
        setKey(keyPressed.toUpperCase());
      } else if (keyPressed === "Enter" || keyPressed === "Backspace") {
        setKey(keyPressed);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handling key pressed
  useEffect(() => {
    if (gameOver) return;
    if (key === "") return;

    if (key === "Backspace") {
      setMyWord((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      if (
        myWord.length === randomWord.length &&
        prevAttemptPos.current < LENGTH_ATTEMPTS
      ) {
        setAttemptsPos((prev) => prev + 1);
        setKey("");
      }
    } else if (/[a-zA-Z]/.test(key)) {
      if (myWord.length === randomWord.length) return;
      setMyWord((prev) => [...prev, key]);
    }

    setKey("");
  }, [gameOver, key, myWord.length, randomWord.length]);

  // Evaluate attempts and check win/loss
  useEffect(() => {
    setAttempts((prev) => {
      const newAttempts = [...prev];
      let counterCorrect = 0;

      if (attemptsPos !== prevAttemptPos.current) {
        let wordToEvaluate = randomWord.split("");
        const modifyAttempt = myWord.map((letter, index) => {
          let letterEvaluate: AttemptLetter = {
            letter: "",
            isFill: false,
            isCorrect: 0,
            wasAnswer: false,
          };

          if (letter === wordToEvaluate[index]) {
            letterEvaluate = {
              letter,
              isFill: true,
              isCorrect: 1,
              wasAnswer: false,
            };
            counterCorrect += 1;
          } else if (wordToEvaluate.includes(letter)) {
            letterEvaluate = {
              letter,
              isFill: true,
              isCorrect: 2,
              wasAnswer: false,
            };
          } else {
            letterEvaluate = {
              letter,
              isFill: false,
              isCorrect: 3,
              wasAnswer: false,
            };
          }

          wordToEvaluate = replaceOneWithSpace(wordToEvaluate, letter);
          return letterEvaluate;
        });

        newAttempts[attemptsPos - 1] = modifyAttempt;
        prevAttemptPos.current += 1;
        setMyWord([]);

        if (counterCorrect === randomWord.length) {
          setDidWin(true);
          setGameOver(true);
        } else if (attemptsPos >= LENGTH_ATTEMPTS) {
          setDidWin(false);
          setGameOver(true);
        }

      } else {
        const modifyAttempt = myWord.map((letter: string) => ({
          letter,
          isFill: true,
          isCorrect: 3,
          wasAnswer: true,
        }));

        while (modifyAttempt.length !== LENGTH_RANDOM_WORD) {
          modifyAttempt.push({
            letter: "",
            isFill: false,
            isCorrect: 0,
            wasAnswer: false,
          });
        }

        newAttempts[attemptsPos] = modifyAttempt;
      }

      return newAttempts;
    });
  }, [attemptsPos, myWord, randomWord]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Header />
      <AllAttemptsWords attempts={attempts} />

      <KeyPressedContext.Provider value={{ key, setKey }}>
        <Keyboard />
      </KeyPressedContext.Provider>

      {gameOver && (
        <GameOverModal
          word={randomWord}
          didWin={didWin}
          onClose={() => {
            setRandomWord(generateRandomWord(Math.floor(Math.random() * (7 - 4 + 1)) + 4))            
            setAttemptsLength(Math.floor(Math.random() * (7 - 5 + 1)) + 5)
            setRandomWord(generateRandomWord(LENGTH_RANDOM_WORD).toUpperCase());
            setAttempts(generateAttempts(LENGTH_RANDOM_WORD, LENGTH_ATTEMPTS));
            setAttemptsPos(0);
            prevAttemptPos.current = 0;
            setGameOver(false);
            setDidWin(false);
            setMyWord([]);
          }}
        />
      )}
    </div>
  );
}
