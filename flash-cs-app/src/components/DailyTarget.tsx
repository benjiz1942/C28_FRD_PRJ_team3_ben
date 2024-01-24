import React from "react";
import { getDailyTargetAPI } from "../api/dashBoardAPI";
import { queryKey } from "../api/utilsAPI";
import { useQuery } from "@tanstack/react-query";

export default function DailyTarget() {
  const {
    data: target,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [queryKey.TARGET],
    queryFn: getDailyTargetAPI,
  });

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    );

  if (error) return <div>Please set the daily target</div>;

  const newCard = target?.newCard ?? 0;
  const newCardTarget = target?.newCardTarget ?? 0;
  const exerciseDone = target?.exerciseDone ?? 0;
  const exerciseTarget = target?.exerciseTarget ?? 0;

  return (
    <>
      {/* First block */}
      <div className="rounded-3xl bg-black ml-10 my-10 sm:p-6 text-4xl max-w-[500px]">
        Vocabulary Learnt Today
        <h2
          className={`font-semibold text-4xl mt-5 ${
            newCard >= newCardTarget
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {newCard} / {newCardTarget}
        </h2>
      </div>

      {/* Second block */}
      <div className="rounded-3xl bg-black ml-10 p-4 sm:p-6 text-4xl max-w-[500px]">
        Exercise Completed
        <h2
          className={`font-semibold text-4xl mt-5 ${
            exerciseDone >= exerciseTarget
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {exerciseDone} / {exerciseTarget}
        </h2>
      </div>
    </>
  );
}
