"use client";
import React, { useState } from "react";
import { useGame } from "@/utils/useGame";
import { BsSendFill } from "react-icons/bs";

const WriteName = () => {
  const { newName, isGameOn, isLoadingAnswer } = useGame();
  const [input, setInput] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (input !== "") {
      await newName(input.split(".").join(""));
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex justify-center items-center gap-2"
    >
      <input
        type="text"
        id="name"
        placeholder="Bir isim yaz"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="block w-50 capitalize text-center text-lg rounded-2xl border-0 py-2 px-3 bg-gradient-to-l from-indigo-200 via-purple-200 to-pink-200 text-purple-800 shadow-lg font-semibold sm:leading-6 outline-none"
      />

      <button
        disabled={!isGameOn || isLoadingAnswer}
        className={`bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 text-xl shadow-lg ${
          !isGameOn || isLoadingAnswer ? "opacity-50" : ""
        }`}
        type="submit"
      >
        <BsSendFill />
      </button>
    </form>
  );
};
export default WriteName;
