"use client";
import React from "react";
import { useGame } from "@/utils/useGame";

const Score = () => {
  const { score } = useGame();

  return (
    <div className="w-100 flex justify-center text-xl text-indigo-700 font-bold my-3 lg:my-5">
      Skor: {score?.toString() || 0}
    </div>
  );
};

export default Score;
