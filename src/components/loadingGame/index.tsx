import React, { useState } from "react";
import { useGame } from "@/utils/useGame";
import Rules from "@/components/rules";

const LoadingGame = () => {
  const { createNewGame } = useGame();
  const [showRules, setShowRules] = useState(false);
  return (
    <div className="h-full flex items-center justify-center flex-col gap-6 py-1 lg:py-6 sm:px-6 lg:px-8">
      <h1 className="text-4xl">Merhaba</h1>
      <p className="text-md md:text-lg text-center w-auto xl:w-[54rem] px-6">
        Son Harf, kullanıcının ya ChatGpt&apos;ye karşı ya da bilgisayara karşı
        oynadığı, rakibin söylediği ismin son harfinden isim türetmeye dayanan
        bir kelime oyunudur.
      </p>
      <button
        onClick={() => setShowRules(true)}
        className="bg-gradient-to-l from-indigo-200 via-purple-200 to-pink-200 text-gray-700 fontbold rounded-md py-2 px-4"
      >
        Kurallar İçin Tıklayınız
      </button>
      <Rules showRules={showRules} setShowRules={setShowRules} />
      <button
        className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 font-bold text-2xl mt-4"
        onClick={() => createNewGame(true)}
      >
        Oyuna Başla
      </button>
    </div>
  );
};

export default LoadingGame;
