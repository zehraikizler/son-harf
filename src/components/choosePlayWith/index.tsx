"use client";
import React, { useState } from "react";
import { useGame } from "@/utils/useGame";
import { AiOutlineArrowDown } from "react-icons/ai";

const ChoosePlayWith = () => {
  const { messages, playingWith, setPlayingWith, isGameOn, setIsGameOn } =
    useGame();
  const msg = new SpeechSynthesisUtterance();
  const withComputer = () => {
    sayStartGameMessage();
    setPlayingWith("computer");
    setIsGameOn(true);
  };

  const withChatGpt = () => {
    sayStartGameMessage();
    setPlayingWith("chatGpt");
    setIsGameOn(true);
  };

  const sayStartGameMessage = () => {
    if (messages.length < 4) {
      msg.text = messages[2].content;
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="w-100 flex flex-col justify-center text-md text-pink-600 font-extrabold my-0 lg:my-7">
      {playingWith == "" ? (
        <div className="flex justify-center items-center gap-2 text-lg">
          <AiOutlineArrowDown className="up-down-animation" /> Rakibini seç
          <AiOutlineArrowDown className="up-down-animation" />
        </div>
      ) : playingWith == "chatGpt" ? (
        <div className="text-center text-lg">ChatGpt ile oynanıyor.</div>
      ) : (
        <div className="text-center text-lg">Bilgisayar ile oynanıyor.</div>
      )}
      <div className="flex flex-row justify-center gap-2">
        <button
          className={`bg-gradient-to-l from-purple-200 to-pink-200 w-32 text-pink-500 rounded-2xl py-1 px-2  mt-4 ${
            isGameOn ? "opacity-50" : ""
          }`}
          onClick={() => withComputer()}
          disabled={isGameOn}
        >
          Bilgisayar
        </button>
        <button
          className={`bg-gradient-to-l from-purple-200 to-pink-200 w-32 text-pink-500 rounded-2xl py-1 px-2  mt-4 ${
            isGameOn ? "opacity-50" : ""
          }`}
          onClick={() => withChatGpt()}
          disabled={isGameOn}
        >
          ChatGpt
        </button>
      </div>
    </div>
  );
};

export default ChoosePlayWith;
