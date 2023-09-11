"use client";
import React, {useState} from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import SayName from "../sayName";
import WriteName from "../writeName";

const SayOrWriteName = () => {

  const [sayOrWrite, setSayOrWrite] = useState('');

  if(sayOrWrite == 'speak') {
    return (
      <>
        <SayName />
      </>
    );
  }

  if(sayOrWrite == 'write') {
    return (
      <>
        <WriteName />
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-4">
        <div className="flex justify-center items-center gap-2 text-lg text-purple-700">
          <AiOutlineArrowDown className="up-down-animation" /> 
          Konuş veya Yaz
          <AiOutlineArrowDown className="up-down-animation" />
        </div>
      <div className="flex justify-center my-3">
      <div className="flex flex-row justify-center gap-2">
          <button
            className="bg-gradient-to-l from-purple-200 to-purple-200 w-32 text-purple-500 rounded-2xl py-1 px-2 mt-4"
             onClick={() => setSayOrWrite("speak")}
          >
            Konuş
          </button>
          <button
            className="bg-gradient-to-l from-purple-200 to-purple-200 w-32 text-purple-500 rounded-2xl py-1 px-2 mt-4"
             onClick={() => setSayOrWrite("write")}
          >
            Yaz
          </button>
        </div>
      </div>
    </div>
  );
};
export default SayOrWriteName;
