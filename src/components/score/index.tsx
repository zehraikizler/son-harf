"use client";
import React, { useState } from "react";

const Score = () => {
  const [score, setScore] = useState(0);

  return (
    <div className="w-100 flex justify-center text-lg text-indigo-700 font-bold my-3 lg:my-5">
      Skor: {score}
    </div>
  );
};

export default Score;
