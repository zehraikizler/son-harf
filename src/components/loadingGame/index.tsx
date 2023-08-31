import React from "react";
import { useMessages } from "@/utils/useMessages";

const LoadingGame = () => {
  const { isLoadingGame ,setIsLoadingGame } = useMessages();
  return (
    <div className="flex items-center justify-center flex-col gap-6 h-full">
      <h1 className="text-4xl">Merhaba</h1>
      <p className="text-lg text-center w-[54rem]">
        Son Harf, kullanıcının ya chatGpt'ye karşı ya da bilgisayara karşı
        oynadığı, rakibin söylediği ismin son harfinden isim türetmeye dayanan
        bir kelime oyunu deneyidir.
      </p>
      <button className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 font-bold text-2xl mt-4"
      onClick={() => setIsLoadingGame(false)} >
        Oyuna Başla
      </button>
    </div>
  );
};

export default LoadingGame;
