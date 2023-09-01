import React, { useState } from "react";
import { useGame } from "@/utils/useGame";

const GameOver = () => {
  const { score, resetGame, playingWith, winner } = useGame();

  return (
    <div className="game-page flex items-center justify-center flex-col gap-6">
      <h1
        className={`text-4xl ${
          winner == "user" ? "text-pink-700" : "text-indigo-700"
        } `}
      >
        {winner == "user" ? "Tebrikler, Kazandınız!" : "Kaybettiniz :("}
      </h1>
      <p className="text-md md:text-lg text-center w-auto xl:w-[54rem] px-6">
        {playingWith == "chatGpt" ? "Chat GPT" : "Bilgisayar"} ile oynadığınız
        oyunda {winner == "user" ? "kazanan" : "kaybeden"} sizsiniz. <br />
        Yeni bir oyuna başlamak ister misin?
      </p>

      <p className="text-md md:text-lg text-center w-auto xl:w-[54rem] px-6">
        Skor: {score?.toString() || 0}
      </p>
      <button
        className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 font-bold text-2xl mt-4"
        onClick={() => resetGame()}
      >
        Yeni Oyuna Başla
      </button>
    </div>
  );
};

export default GameOver;
