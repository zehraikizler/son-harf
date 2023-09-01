"use client";
import React, { useState } from "react";
import { useGame } from "@/utils/useGame";
import { AiOutlineArrowDown } from "react-icons/ai";

const ChoosePlayWith = () => {
  const { playingWith, setPlayingWith, isGameOn, setIsGameOn } = useGame();

  const withComputer = () => {
    setPlayingWith("computer");
    setIsGameOn(true);
  };

  const withChatGpt = () => {
    setPlayingWith("chatGpt");
    setIsGameOn(true);
  };
  return (
    <div className="w-100 flex flex-col justify-center text-md text-pink-700 font-extrabold my-7">
      {playingWith == "" ? (
        <div className="flex justify-center items-center gap-2">
          <AiOutlineArrowDown className="up-down-animation" /> Rakibini seç{" "}
          <AiOutlineArrowDown className="up-down-animation" />
        </div>
      ) : playingWith == "chatGpt" ? (
        <div className="text-center">ChatGpt ile oynanıyor.</div>
      ) : (
        <div className="text-center">Bilgisayar ile oynanıyor.</div>
      )}
      <div>
        {isGameOn ? (
          <div className="flex flex-col justify-center lg:flex-row gap-2">
            <button
              className="bg-gradient-to-l from-purple-200 to-pink-200 w-32 text-pink-500 opacity-60 rounded-2xl py-1 px-2 text-sm mt-4"
              onClick={() => withComputer()}
              disabled
            >
              Bilgisayar
            </button>
            <button
              className="bg-gradient-to-l from-purple-200 to-pink-200 w-32 text-pink-500 opacity-60 rounded-2xl py-1 px-2 text-sm mt-4"
              onClick={() => withChatGpt()}
              disabled
            >
              ChatGpt
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center lg:flex-row gap-2">
            <button
              className="bg-gradient-to-l from-purple-200 to-pink-200 w-32 text-pink-500 rounded-2xl py-1 px-2 text-sm mt-4"
              onClick={() => withComputer()}
            >
              Bilgisayar
            </button>
            <button
              className="bg-gradient-to-l from-purple-200 to-pink-200 w-32 text-pink-500 rounded-2xl py-1 px-2 text-sm mt-4"
              onClick={() => withChatGpt()}
            >
              ChatGpt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoosePlayWith;
