"use client"
import React, { useState } from 'react'

const Count = () => {
  const [count, setCount] = useState(10)

  return (
    <div className='w-100 flex justify-center text-4xl text-green-600 font-extrabold my-5'>{count}</div>
  )
}

export default Count