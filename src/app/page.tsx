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
    <div className="game-page py-6 sm:px-6 lg:px-8 ">
      {isLoadingGame ? (
       <LoadingGame />
      ) : (
        <div className="grid grid-cols-8">
          <div className="col-span-4 lg:col-span-2 p-3 h-14">
            <ChoosePlayWith />
          </div>
          <div className="col-span-4 lg:col-span-2 lg:order-last p-3 h-14">
            <Score />
            <Count />
          </div>
          <div className="col-span-8 lg:col-span-4 p-3 flex flex-col">
            <div className="bg-white border shadow-lg rounded-xl h-80 lg:h-60 mt-2 p-4 lg:p-8 overflow-y-scroll no-scrollbar flex flex-col">
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
