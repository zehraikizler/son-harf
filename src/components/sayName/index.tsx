"use client";
import React, { useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useGame } from "@/utils/useGame";
import { BsFillMicFill, BsMicMuteFill } from "react-icons/bs";

const SayName = () => {
  const { newName, isGameOn, isLoadingAnswer } = useGame();
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
      AddAnswer();
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn&apos;t support speech recognition.</span>;
  }

  const AddAnswer = async () => {
    if (transcript !== "" && listening == false) {
      await newName(transcript.split(".").join(""));
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="lastletter tracking-widest uppercase text-center text-2xl font-bold block w-full rounded-md border-0 py-4 text-gray-900 h-10">
        {transcript.split("").reverse().join("")}
      </div>
      <div className="flex justify-center my-3">
        <button
          disabled={!isGameOn || isLoadingAnswer}
          onClick={() => SpeechRecognition.startListening({ language: "tr" })}
          className={`flex gap-2 items-center bg-gradient-to-l from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl py-2 px-4 font-bold text-xl mt-4 ${
            !isGameOn || isLoadingAnswer ? "opacity-50" : ""
          }`}
        >
          Bir isim söyle {listening ? <BsFillMicFill /> : <BsMicMuteFill />}
        </button>
      </div>
    </div>
  );
};
export default SayName;
