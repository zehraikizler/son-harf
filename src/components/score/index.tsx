"use client"
import React, { useState } from 'react'

const Score = () => {
  const [score, setScore] = useState(0)

  return (
    <div className='w-100 flex justify-center text-xl text-pink-700 font-extrabold my-7'>Score: {score}</div>
  
  )
}

export default Score