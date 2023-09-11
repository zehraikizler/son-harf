import React, { useState } from "react";
import { useGame } from "@/utils/useGame";

const GameOver = () => {
  const { messages, score, createNewGame, playingWith, winner, gameOverMessage } = useGame();

  return (
    <div className="h-full flex items-center justify-center flex-col gap-6 py-1 lg:py-6 sm:px-6 lg:px-8">
      <h1
        className={`text-4xl ${
          winner == "user" ? "text-pink-700" : "text-indigo-700"
        } `}
      >
        {winner == "user" ? "Tebrikler, Kazandınız!" : "Kaybettiniz :("}
      </h1>
      <p className="text-md md:text-lg text-center w-auto xl:w-[54rem] px-6">
        {playingWith == "chatGpt" ? "ChatGPT" : "Bilgisayar"} ile oynadığınız
        oyunda {winner == "user" ? "kazanan" : "kaybeden"} sizsiniz. Çünkü {gameOverMessage}
      </p>

      <p className="text-md md:text-lg text-center w-auto xl:w-[54rem] px-6 text-purple-600">
        Skor: {score?.toString() || 0}
      </p>

      <div className="h-[16rem] overflow-y-scroll w-96 no-scrollbar border bg-white p-3 rounded-md">
        {messages?.map((message, i) => {
          const isUser = message.role === "user";
          if (message.role === "system") return null;
          return (
            <div
              id={`message-${i}`}
              className={`flex mb-1 fade-up ${isUser ? "justify-end" : "justify-start"} ${i == 1 ? "hidden" : ""}  ${i == 2 ? "hidden" : ""}`}
              key={i}
            >
              <div
                style={{ maxWidth: "calc(100% - 45px)" }}
                className={`group relative rounded-lg capitalize ${
                  isUser
                    ? "bg-purple-200 px-1 py-1 rounded-3xl rounded-br-none"
                    : "bg-pink-200 px-1 py-1 rounded-3xl rounded-bl-none"
                }`}
              >
                {message.content.trim()}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 font-bold text-2xl mt-4"
        onClick={() => createNewGame()}
      >
        Yeni Oyuna Başla
      </button>
    </div>
  );
};

export default GameOver;
