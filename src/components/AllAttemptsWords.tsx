import React from "react";
import Attempts from "./Attempts";
import Loading from "./Loading";

type AttemptLetter = {
  letter: string
  isFill: boolean
  isCorrect: number
  wasAnswer: boolean
}

type AllAttemptsWordsProps = {
  attempts: AttemptLetter[][]
};

export const AllAttemptsWords = React.memo(function AllAttemptsWords({attempts}: AllAttemptsWordsProps) {

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
