"use client";
import React, { useState, useEffect } from "react";
import Answers from "@/components/answers";
import Count from "@/components/count";
import SayName from "@/components/say-name";
import Score from "@/components/score";
import LoadingGame from "@/components/loadingGame";
import { useGame } from "@/utils/useGame";
import ChoosePlayWith from "@/components/choosePlayWith";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isLoadingGame } = useGame();
  return (
    <div className="game-page py-1 lg:py-6 sm:px-6 lg:px-8 ">
      {isLoadingGame ? (
        <LoadingGame />
      ) : (
        <div className="grid grid-cols-8">
          <div className="col-span-8 lg:col-span-2 p-3">
            <ChoosePlayWith />
          </div>
          <div className="col-span-8 lg:col-span-2 lg:order-last px-4 lg:p-3 flex flex-row lg:flex-col justify-between lg:justify-start items-center">
            <Score />
            <Count />
          </div>
          <div className="col-span-8 lg:col-span-4 p-3 flex flex-col">
            <div className="bg-white border shadow-lg rounded-xl h-80 md:h-60 mt-2 p-4 lg:p-8 overflow-y-scroll no-scrollbar flex flex-col">
              <Answers />
            </div>
            <div className="mt-auto">
              <SayName />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
