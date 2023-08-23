import React from "react";
import Answers from "@/components/answers";
import Count from "@/components/count";
import GamingBox from "@/components/say-name";
import Score from "@/components/score";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="game-page bg-white mx-auto py-6 sm:px-6 lg:px-8 grid grid-cols-8">
      <div className="col-span-4 lg:col-span-2 p-3 h-14">
        <Score />
      </div>
      <div className="col-span-4 lg:col-span-2 lg:order-last p-3 h-14">
        <Count />
      </div>
      <div className="col-span-8 lg:col-span-4 p-3 flex flex-col">
        <div className="border rounded-xl h-80 lg:h-60 p-8 overflow-y-scroll no-scrollbar flex flex-col">
          <Answers />
        </div>
        <div className="mt-auto">
          <GamingBox />
        </div>
      </div>
    </div>
  );
}
