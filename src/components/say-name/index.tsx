"use client";
import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useMessages } from "@/utils/useMessages";

const SayName = () => {
  const { messages, addMessage } = useMessages();
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const AddAnswer = async () => {
    if (transcript !== "" && listening == false) {
      await addMessage(transcript);
      console.log(messages);
    }
  };

  useEffect(() => {
    AddAnswer();
  }, [!listening]);

  return (
    <div className="flex flex-col justify-center">
      <div className="lastletter tracking-widest bg-white uppercase text-center text-2xl font-bold block w-full rounded-md border-0 py-4 text-gray-900">
        {transcript.split("").reverse().join("")}
      </div>
      <div className="flex justify-center my-3">
        <button
          onClick={() => SpeechRecognition.startListening()}
          className="bg-blue-600 rounded-3xl px-3 text-white w-48 h-14 font-extrabold text-2xl"
        >
          Start
        </button>
      </div>
    </div>
  );
};
export default SayName;
