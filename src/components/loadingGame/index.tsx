import React from "react";
import { useMessages } from "@/utils/useMessages";

const LoadingGame = () => {
  const { setIsLoadingGame, setPlayingWith } = useMessages();

  const withComputer = () => {
    setPlayingWith("computer")
    setIsLoadingGame(false)
  }

  const withChatGpt = () => {
    setPlayingWith("chatGpt")
    setIsLoadingGame(false)
  }

  return (
    <div className="flex items-center justify-center flex-col gap-6 h-full">
      <h1 className="text-4xl">Merhaba</h1>
      <p className="text-lg text-center w-[54rem]">
        Son Harf, kullanıcının ya chatGpt'ye karşı ya da bilgisayara karşı
        oynadığı, rakibin söylediği ismin son harfinden isim türetmeye dayanan
        bir kelime oyunu deneyidir.
      </p>
      <div className="flex flex-col lg:flex-row gap-4">
        <button
          className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 w-60 text-white rounded-2xl py-2 px-4 font-semibold text-lg mt-4"
          onClick={() => withComputer()}
        >
          Bilgisayar ile oyna
        </button>
        <button
          className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 w-60 text-white rounded-2xl py-2 px-4 font-semibold text-lg mt-4"
          onClick={() => withChatGpt()}
        >
          ChatGpt ile oyna
        </button>
      </div>
    </div>
  );
};

export default LoadingGame;
