import React, { useContext, useEffect } from "react";
import Attempts from "./Attempts";
import Loading from "./Loading";
import { generateAttempts } from "../utils/logic";
import { AttemptsContext } from "../hook/AttemptsContext";

type AllAttemptsWordsProps = {
  word: string;
  attemptsLength: number;
};

export const AllAttemptsWords = React.memo(function AllAttemptsWords({
  word,
  attemptsLength,
}: AllAttemptsWordsProps) {
  const attemptsContext = useContext(AttemptsContext);
  const attempts = attemptsContext?.attempts;
  const setAttempts = attemptsContext?.setAttempts;

  useEffect(() => {
    if (!setAttempts) return;
    const newAttempts = generateAttempts(word.length, attemptsLength);
    setAttempts(newAttempts);
  }, [attemptsLength, word, setAttempts]);

  if (!attempts) {
    return <Loading />;
  }

  return (
    <div className="mt-2 flex flex-col gap-2">
      {attempts.map((item, index) => (
        <Attempts key={index + 1} word={item} />
      ))}
    </div>
  );
});
