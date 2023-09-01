import React from "react";
import { useGame } from "@/utils/useGame";

const LoadingGame = () => {
  const { isLoadingGame, setIsLoadingGame } = useGame();
  return (
    <div className="game-page flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl">Merhaba</h1>
      <p className="text-md md:text-lg text-center w-auto xl:w-[54rem] px-6">
        Son Harf, kullanıcının ya chatGpt'ye karşı ya da bilgisayara karşı
        oynadığı, rakibin söylediği ismin son harfinden isim türetmeye dayanan
        bir kelime oyunudur.
      </p>
      <button
        className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 font-bold text-2xl mt-4"
        onClick={() => setIsLoadingGame(false)}
      >
        Oyuna Başla
      </button>
    </div>
  );
};

export default LoadingGame;
