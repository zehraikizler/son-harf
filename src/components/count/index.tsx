"use client";
import React, { useEffect, useState } from "react";
const Count = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    count > 0 && setTimeout(() => setCount(count - 1), 1000);
  }, [count]);

  return (
    <div className="w-100 flex flex-col justify-center items-center mb-0 mt-0 lg:mt-2">
      <div className="bg-gradient-to-r from-purple-200 to-indigo-200 text-indigo-500 font-bold text-xl lg:text-3xl flex justify-center items-center rounded-full w-10 lg:w-14 h-10 lg:h-14">
        {count}
      </div>
      <div className="text-xs mt-2 text-indigo-400 font-extralight hidden lg:block">
        saniye içinde cevap verin
      </div>
    </div>
  );
};

export default Count;
