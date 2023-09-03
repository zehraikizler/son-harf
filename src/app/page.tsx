"use client";
import React, { useState, useEffect } from "react";
import Answers from "@/components/answers";
import Timer from "@/components/timer";
import SayName from "@/components/say-name";
import Score from "@/components/score";
import LoadingGame from "@/components/loadingGame";
import { useGame } from "@/utils/useGame";
import ChoosePlayWith from "@/components/choosePlayWith";
import GameOver from "@/components/gameOver";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isLoadingGame, gameOver } = useGame();
  if (gameOver) {
    return (
      <div className="game-page py-1 lg:py-6 sm:px-6 lg:px-8 ">
        <GameOver />
      </div>
    );
  }
  if (isLoadingGame) {
    return (
      <div className="game-page py-1 lg:py-6 sm:px-6 lg:px-8 ">
        <LoadingGame />
      </div>
    );
  }
  return (
    <div className="game-page py-1 lg:py-6 sm:px-6 lg:px-8 ">
      <div className="grid grid-cols-8">
        <div className="col-span-8 lg:col-span-2 p-3">
          <ChoosePlayWith />
        </div>
        <div className="col-span-8 lg:col-span-2 lg:order-last px-4 lg:p-3 flex flex-row lg:flex-col justify-between lg:justify-start items-center">
          <Score />
          <Timer />
        </div>
        <div className="col-span-8 lg:col-span-4 p-3 flex flex-col">
          <div className="bg-white border shadow-lg rounded-xl h-80 md:h-[22rem] mt-2 p-4 lg:p-8 overflow-y-scroll no-scrollbar flex flex-col">
            <Answers />
          </div>
          <div className="mt-auto">
            <SayName />
          </div>
        </div>
      </div>
    </div>
  );
}
